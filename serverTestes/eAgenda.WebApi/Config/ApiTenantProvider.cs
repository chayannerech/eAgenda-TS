using eAgenda.Dominio.Compartilhado;
using System.Security.Claims;

namespace eAgenda.WebApi.Config
{
    public class ApiTenantProvider : ITenantProvider
    {
        private readonly IHttpContextAccessor contextAccessor;

        public ApiTenantProvider(IHttpContextAccessor contextAccessor)
        {
            this.contextAccessor = contextAccessor;
        }

        public Guid UsuarioId
        {
            get
            {
                var claimId = contextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);

                if (claimId == null)
                    return Guid.Empty;

                return Guid.Parse(claimId.Value);
            }
        }
    }
}
