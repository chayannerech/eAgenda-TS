using System;

namespace eAgenda.Dominio.Compartilhado
{
    public interface ITenantProvider
    {
        Guid UsuarioId { get; }
    }
}
