using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace eAgenda.Infra.Orm.Compartilhado
{
    public class eAgendaDbContextFactory : IDesignTimeDbContextFactory<EAgendaDbContext>
    {
        public EAgendaDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<EAgendaDbContext>();

            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            string connectionString = configuration.GetConnectionString("SqlServer");

            builder.UseSqlServer(connectionString);

            return new EAgendaDbContext(builder.Options);
        }
    }
}
