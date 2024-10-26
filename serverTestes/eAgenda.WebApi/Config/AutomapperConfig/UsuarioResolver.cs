using eAgenda.Dominio.ModuloContato;
using eAgenda.WebApi.ViewModels.ModuloContato;
using System.Security.Claims;

namespace eAgenda.WebApi.Config.AutomapperConfig
{
    public class UsuarioResolver : IValueResolver<Object, Object, Guid>
    {
        private readonly IHttpContextAccessor contextAccessor;

        public UsuarioResolver(IHttpContextAccessor contextAccessor)
        {
            this.contextAccessor = contextAccessor;
        }

        public Guid Resolve(Object viewModel, Object entidade, Guid id, ResolutionContext context)
        {
            return Guid.Parse(contextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }

    }
}
