namespace eAgenda.WebApi.ViewModels.ModuloAutenteticacao
{
    public class RegistrarUsuarioViewModel
    {
        public required string Nome { get; set; }               
        public required string Login { get; set; }               
        public required string Email { get; set; }
        public required string Senha { get; set; }
    }
}
