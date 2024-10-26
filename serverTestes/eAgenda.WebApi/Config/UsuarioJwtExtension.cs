using eAgenda.Dominio.ModuloAutenticacao;
using eAgenda.WebApi.ViewModels.ModuloAutenteticacao;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace eAgenda.WebApi.Config
{
    public static class UsuarioJwtExtension
    {
        public static TokenViewModel GerarJwt(this Usuario usuario, DateTime dataExpiracao)
        {
            string chaveToken = CriarChaveToken(usuario, dataExpiracao);

            var tokem = new TokenViewModel
            {
                Chave = chaveToken,
                DataExpiracao = dataExpiracao,
                Usuario = new UsuarioTokenViewModel
                {
                    Id = usuario.Id,
                    Nome = usuario.Nome,
                    Email = usuario.Email,
                    Login = usuario.UserName
                }
            };

            return tokem;
        }

        private static string CriarChaveToken(Usuario usuario, DateTime dataExpiracao)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var segredo = Encoding.ASCII.GetBytes("07xiA716eLITq7smiUueBD0QpqcTcR8V");

            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = "eAgenda",
                Audience = "http://localhost",
                Subject = ObterIdentityClaims(usuario),
                Expires = dataExpiracao,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(segredo), SecurityAlgorithms.HmacSha256Signature)
            });

            string chaveToken = tokenHandler.WriteToken(token);

            return chaveToken;
        }

        private static ClaimsIdentity ObterIdentityClaims(Usuario usuario)
        {
            var identityClaims = new ClaimsIdentity();

            identityClaims.AddClaim(new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()));
            identityClaims.AddClaim(new Claim(JwtRegisteredClaimNames.Email, usuario.Email));
            identityClaims.AddClaim(new Claim(JwtRegisteredClaimNames.UniqueName, usuario.UserName));
            identityClaims.AddClaim(new Claim(JwtRegisteredClaimNames.GivenName, usuario.Nome));

            return identityClaims;
        }
    }
}
