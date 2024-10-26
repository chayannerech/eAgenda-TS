using Microsoft.AspNetCore.Identity;
using System;
using Taikandi;

namespace eAgenda.Dominio.ModuloAutenticacao
{
    public class Usuario : IdentityUser<Guid>
    {
        public Usuario()
        {
            Id = SequentialGuid.NewGuid();
            EmailConfirmed = true;
        }

        public string Nome { get; set; }
    }
}
