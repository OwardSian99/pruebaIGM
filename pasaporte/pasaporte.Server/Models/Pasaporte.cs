using System;
using System.Collections.Generic;

namespace pasaporte.Server.Models;

public partial class Pasaporte
{
    public long IdPasaporte { get; set; }

    public int TipoPasaporte { get; set; }

    public DateOnly FechaEmision { get; set; }

    public DateOnly FechaVencimiento { get; set; }

    public string? Lugar { get; set; }

    public int? IdPais { get; set; }

    public Guid? IdUsuario { get; set; }

    public bool Estado { get; set; }

    public virtual Pai? IdPaisNavigation { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
