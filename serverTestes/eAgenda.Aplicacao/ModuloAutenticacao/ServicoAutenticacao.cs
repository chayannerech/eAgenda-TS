using eAgenda.Aplicacao.Compartilhado;
using eAgenda.Dominio.ModuloAutenticacao;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eAgenda.Aplicacao.ModuloAutenticacao
{
    public class ServicoAutenticacao : ServicoBase<Usuario, ValidadorUsuario>
    {
        private readonly UserManager<Usuario> userManager;
        private readonly SignInManager<Usuario> signInManager;

        public ServicoAutenticacao(UserManager<Usuario> userManager, SignInManager<Usuario> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public async Task<Result<Usuario>> RegistrarAsync(Usuario usuario, string senha)
        {
            Result resultado = Validar(usuario);

            if (resultado.IsFailed)
                return Result.Fail(resultado.Errors);

            IdentityResult usuarioResult = await userManager.CreateAsync(usuario, senha);

            if (usuarioResult.Succeeded == false)
                return Result.Fail(usuarioResult.Errors
                    .Select(erro => new Error(erro.Description)));

            return Result.Ok(usuario);
        }

        public async Task<Result<Usuario>> Autenticar(string login, string senha)
        {
            var loginResult = await signInManager.PasswordSignInAsync(login, senha, false, true);

            var erros = new List<IError>();

            if (loginResult.IsLockedOut)
                erros.Add(new Error("O acesso para este usuário foi bloqueado"));

            if (loginResult.IsNotAllowed)
                erros.Add(new Error("O login ou a senha estão incorretas"));

            if (!loginResult.Succeeded)
                erros.Add(new Error("Login falhou: senha incorreta"));

            if (erros.Count > 0)
                return Result.Fail(erros);


            var usuario = await userManager.FindByNameAsync(login);

            return Result.Ok(usuario);
        }

        public async Task<Result<Usuario>> Sair()
        {
            await signInManager.SignOutAsync();

            return Result.Ok();
        }
    }
}
