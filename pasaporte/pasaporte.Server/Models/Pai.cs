using System;
using System.Collections.Generic;

namespace pasaporte.Server.Models;

public partial class Pai
{
    public int IdPais { get; set; }

    public string NombrePais { get; set; } = null!;

    public virtual ICollection<Pasaporte> Pasaportes { get; set; } = new List<Pasaporte>();
}
