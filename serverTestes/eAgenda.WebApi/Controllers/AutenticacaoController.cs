using eAgenda.Aplicacao.ModuloAutenticacao;
using eAgenda.Dominio.ModuloAutenticacao;
using eAgenda.WebApi.ViewModels.ModuloAutenteticacao;

namespace eAgenda.WebApi.Controllers
{
    [Route("api/contas")]
    [ApiController]
    public class AutenticacaoController : ApiControllerBase
    {
        private readonly ServicoAutenticacao servicoAutenticacao;
        private readonly IMapper mapeador;

        public AutenticacaoController(ServicoAutenticacao servicoAutenticacao, IMapper mapeador)
        {
            this.servicoAutenticacao = servicoAutenticacao;
            this.mapeador = mapeador;
        }


        [HttpPost("registrar")]
        public async Task<IActionResult> Registrar(RegistrarUsuarioViewModel viewModel)
        {
            var usuario = mapeador.Map<Usuario>(viewModel);
            
            var usuarioResult = await servicoAutenticacao.RegistrarAsync(usuario, viewModel.Senha);

            if (usuarioResult.IsFailed)
                return BadRequest(usuarioResult.Errors);

            var tokenViewModel = usuario.GerarJwt(DateTime.Now.AddDays(5));

            return Ok(tokenViewModel);
        }

        [HttpPost("autenticar")]
        public async Task<IActionResult> Autenticar(AutenticarUsuarioViewModel viewModel)
        {
            var usuarioResult = await servicoAutenticacao.Autenticar(viewModel.Login, viewModel.Senha);

            if (usuarioResult.IsFailed)
                return BadRequest(usuarioResult.Errors);

            var usuario = usuarioResult.Value;

            var tokenViewModel = usuario.GerarJwt(DateTime.Now.AddDays(5));

            return Ok(tokenViewModel);
        }

        [HttpPost("sair")]
        public async Task<IActionResult> Sair()
        {
            await servicoAutenticacao.Sair();

            return Ok();
        }

        

    }
}
