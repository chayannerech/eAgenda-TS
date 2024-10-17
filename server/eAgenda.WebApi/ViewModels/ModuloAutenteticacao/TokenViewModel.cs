namespace eAgenda.WebApi.ViewModels.ModuloAutenteticacao
{
    public class TokenViewModel
    {
        public string Chave { get; set; }

        public DateTime DataExpiracao { get; set; }

       public UsuarioTokenViewModel Usuario { get; set; }
    }
}
