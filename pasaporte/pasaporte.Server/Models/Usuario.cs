using System;
using System.Collections.Generic;

namespace pasaporte.Server.Models;

public partial class Usuario
{
    public Guid IdUsuario { get; set; }

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Contrasenia { get; set; } = null!;

    public bool Rol { get; set; }

    public bool Estado { get; set; }

    public virtual ICollection<Pasaporte> Pasaportes { get; set; } = new List<Pasaporte>();
}
