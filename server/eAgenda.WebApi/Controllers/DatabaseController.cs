using eAgenda.Dominio.ModuloAutenticacao;
using eAgenda.Dominio.ModuloCompromisso;
using eAgenda.Dominio.ModuloContato;
using eAgenda.Dominio.ModuloDespesa;
using eAgenda.Dominio.ModuloTarefa;
using eAgenda.Infra.Orm.Compartilhado;

namespace eAgenda.WebApi.Controllers;

[Route("api/db")]
public class DatabaseController : Controller
{
    private readonly EAgendaDbContext _context;
    private readonly IWebHostEnvironment _env;

    public DatabaseController(EAgendaDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    // Este endpoint só funciona em ambiente de desenvolvimento
    [HttpDelete("limpar")]
    public async Task<IActionResult> LimparBancoDeDados()
    {
        if (!_env.IsDevelopment())
            return Unauthorized("Esta operação só é possível em um ambiente de desenvolvimento");
        
        try
        {
            await _context.Set<Compromisso>().IgnoreQueryFilters().ExecuteDeleteAsync();
            await _context.Set<Contato>().IgnoreQueryFilters().ExecuteDeleteAsync();
            await _context.Set<Despesa>().IgnoreQueryFilters().ExecuteDeleteAsync();
            await _context.Set<Categoria>().IgnoreQueryFilters().ExecuteDeleteAsync();
            await _context.Set<ItemTarefa>().IgnoreQueryFilters().ExecuteDeleteAsync();
            await _context.Set<Tarefa>().IgnoreQueryFilters().ExecuteDeleteAsync();
            await _context.Set<Usuario>().IgnoreQueryFilters().ExecuteDeleteAsync();

            return Ok("O banco de dados foi limpo com sucesso.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao tentar limpar o banco de dados: {ex.Message}");
        }
    }
}