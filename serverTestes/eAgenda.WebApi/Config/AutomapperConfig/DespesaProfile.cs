using eAgenda.Dominio.Compartilhado;
using eAgenda.Dominio.ModuloDespesa;
using eAgenda.WebApi.ViewModels.ModuloDespesa;

namespace eAgenda.WebApi.Config.AutoMapperConfig
{
    public class DespesaProfile : Profile
    {
        public DespesaProfile()
        {
            CreateMap<FormsDespesaViewModel, Despesa>()
                .ForMember(destino => destino.Categorias, opt => opt.Ignore())
                .ForMember(dest => dest.UsuarioId, opt => opt.MapFrom<UsuarioResolver>())
                .AfterMap<FormsDespesaMappingAction>();            

            CreateMap<Despesa, ListarDespesaViewModel>()
                .ForMember(destino => destino.FormaPagamento, opt => opt.MapFrom(origem => origem.FormaPagamento.GetDescription()));

            CreateMap<Despesa, VisualizarDespesaViewModel>()
                .ForMember(destino => destino.FormaPagamento, opt => opt.MapFrom(origem => origem.FormaPagamento.GetDescription()))
                .ForMember(destino => destino.Categorias, opt => opt.MapFrom(origem => origem.Categorias.Select(x => x.Titulo)));
        }
    }

    public class FormsDespesaMappingAction : IMappingAction<FormsDespesaViewModel, Despesa>
    {
        private readonly IRepositorioCategoria repositorioCategoria;

        public FormsDespesaMappingAction(IRepositorioCategoria repositorioCategoria)
        {
            this.repositorioCategoria = repositorioCategoria;
        }

        public void Process(FormsDespesaViewModel source, Despesa destination, ResolutionContext context)
        {
            destination.Categorias = repositorioCategoria.SelecionarMuitos(source.CategoriasSelecionadas);
        }
    }
}