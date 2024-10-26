using eAgenda.Aplicacao.ModuloAutenticacao;
using eAgenda.Dominio.ModuloAutenticacao;
using eAgenda.Infra.Orm.Compartilhado;
using eAgenda.WebApi.Config.IdentityConfig;
using Microsoft.AspNetCore.Identity;

namespace eAgenda.WebApi.Config
{
    public static class IdentityConfigExtension
    {
        public static void ConfigurarIdentity(this IServiceCollection services)
        {
            services.AddTransient<ServicoAutenticacao>();

            services.AddIdentity<Usuario, IdentityRole<Guid>>(options =>
            {
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<EAgendaDbContext>()
            .AddDefaultTokenProviders()
            .AddErrorDescriber<eAgendaIdentityErrorDescriber>();
        }
    }
}
