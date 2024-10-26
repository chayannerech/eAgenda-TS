namespace eAgenda.WebApi.Config
{
    public static class CorsConfigExtension
    {
        public static void ConfigurarCors(this IServiceCollection services, string nome)
        {
            services.AddCors(config =>
             {
                 config.AddPolicy(nome, politica =>
                 {
                     politica
                         .WithOrigins("http://localhost:4200") // Permite apenas a origem da aplicação Angular
                         .AllowAnyHeader()
                         .AllowAnyMethod()
                         .AllowCredentials();
                 });
             });
        }
    }
}
