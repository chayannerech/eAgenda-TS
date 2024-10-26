using eAgenda.Dominio;
using eAgenda.Dominio.Compartilhado;
using eAgenda.Dominio.ModuloAutenticacao;
using eAgenda.Dominio.ModuloCompromisso;
using eAgenda.Dominio.ModuloContato;
using eAgenda.Dominio.ModuloDespesa;
using eAgenda.Dominio.ModuloTarefa;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace eAgenda.Infra.Orm.Compartilhado;

public class EAgendaDbContext :
    IdentityDbContext<Usuario, IdentityRole<Guid>, Guid>, IContextoPersistencia
{
    private Guid usuarioId;

    public EAgendaDbContext(DbContextOptions options, ITenantProvider tenantProvider = null) : base(options)
    {
        if (tenantProvider != null)
            usuarioId = tenantProvider.UsuarioId;
    }

    public EAgendaDbContext()
    {
    }

    public void GravarDados()
    {
        SaveChanges();
    }

    public async Task<bool> GravarDadosAsync()
    {
        int registrosAfetados = await SaveChangesAsync();

        return registrosAfetados > 0;
    }

    public void DesfazerAlteracoes()
    {
        var registrosAlterados = ChangeTracker.Entries()
            .Where(e => e.State != EntityState.Unchanged)
            .ToList();

        foreach (var registro in registrosAlterados)
        {
            switch (registro.State)
            {
                case EntityState.Added:
                    registro.State = EntityState.Detached;
                    break;

                case EntityState.Deleted:
                    registro.State = EntityState.Unchanged;
                    break;

                case EntityState.Modified:
                    registro.State = EntityState.Unchanged;
                    registro.CurrentValues.SetValues(registro.OriginalValues);
                    break;

                default:
                    break;
            }
        }
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

        ILoggerFactory loggerFactory = LoggerFactory.Create((x) =>
        {
            x.AddSerilog(Log.Logger);
        });

        optionsBuilder.UseLoggerFactory(loggerFactory);

        optionsBuilder.EnableSensitiveDataLogging();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        Type tipo = typeof(EAgendaDbContext);

        Assembly dllComConfiguracoesOrm = tipo.Assembly;

        modelBuilder.ApplyConfigurationsFromAssembly(dllComConfiguracoesOrm);

        modelBuilder.Entity<Contato>().HasQueryFilter(x => x.UsuarioId == usuarioId);
        modelBuilder.Entity<Compromisso>().HasQueryFilter(x => x.UsuarioId == usuarioId);
        modelBuilder.Entity<Despesa>().HasQueryFilter(x => x.UsuarioId == usuarioId);
        modelBuilder.Entity<Categoria>().HasQueryFilter(x => x.UsuarioId == usuarioId);
        modelBuilder.Entity<Tarefa>().HasQueryFilter(x => x.UsuarioId == usuarioId);

        base.OnModelCreating(modelBuilder);
    }

}