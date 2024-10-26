using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Linq;

namespace eAgenda.Infra.Orm.Compartilhado
{
    public static class MigradorBancoDados
    {
        public static bool AtualizarBancoDados(DbContext db)
        {
            var qtdMigracoesPendentes = db.Database.GetPendingMigrations().Count();

            if (qtdMigracoesPendentes == 0)
            {
                Log.Information("Nenhuma migração pendente, continuando...");

                return false;
            }

            Log.Information("Aplicando {Migracoes} migrações pendentes, isso pode demorar alguns segundos...", qtdMigracoesPendentes);

            db.Database.Migrate();

            Log.Information("Migrações completas...");

            return true;
        }
    }
}
