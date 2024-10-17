using eAgenda.Dominio.ModuloAutenticacao;
using eAgenda.WebApi.ViewModels.ModuloAutenteticacao;

namespace eAgenda.WebApi.Config.AutomapperConfig
{
    public class UsuarioProfile : Profile
    {
        public UsuarioProfile()
        {
            CreateMap<RegistrarUsuarioViewModel, Usuario>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Login));                
        }
    }
}
