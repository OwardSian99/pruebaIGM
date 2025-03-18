using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pasaporte.Server.Models;
using System.Security.Cryptography;


namespace pasaporte.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PasaporteController : ControllerBase
    {
        private readonly IgmDbContext _dbContext;

        public PasaporteController(IgmDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        [Route("PasaportesUsuario/{id}")]
        public IActionResult PasaportesUsuario(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Debe proporcionar un ID de usuario válido.");
            }

            var pasaportes = _dbContext.Pasaportes
                .Where(p => p.IdUsuario.ToString() == id)
                .Include(p => p.IdPaisNavigation)
                .Select(p => new
                {
                    p.IdPasaporte,
                    p.TipoPasaporte,
                    p.FechaEmision,
                    p.FechaVencimiento,
                    p.Lugar,
                    NombrePais = p.IdPaisNavigation.NombrePais, 
                    Estado = p.Estado ? "Activo" : "Inactivo"
                })
                .ToList();

            if (!pasaportes.Any())
            {
                return NotFound("No se encontraron pasaportes para este usuario.");
            }

            return Ok(pasaportes);
        }

        [HttpGet]
        [Route("ObtenerPasaportes")]
        public IActionResult ObtenerPasaportes(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Debe proporcionar un ID de usuario válido.");
            }

            var pasaportes = _dbContext.Pasaportes
                .Where(p => p.IdUsuario.ToString() == id)
                .Include(p => p.IdPaisNavigation)
                .Select(p => new
                {
                    p.IdPasaporte,
                    p.TipoPasaporte,
                    p.FechaEmision,
                    p.FechaVencimiento,
                    p.Lugar,
                    NombrePais = p.IdPaisNavigation.NombrePais,
                    Estado = p.Estado ? "Activo" : "Inactivo"
                })
                .ToList();

            if (!pasaportes.Any())
            {
                return NotFound("No se encontraron pasaportes para este usuario.");
            }

            return Ok(pasaportes);
        }

        [HttpPut]
        [Route("EstadoPasaporte/{idPasaporte}")]
        public IActionResult ActualizarEstadoPasaporte(long idPasaporte)
        {
            var pasaporte = _dbContext.Pasaportes.FirstOrDefault(p => p.IdPasaporte == idPasaporte);

            if (pasaporte == null)
            {
                return NotFound("El pasaporte no existe.");
            }
                        
            var usuarioId = pasaporte.IdUsuario;

            if (usuarioId == Guid.Empty)
            {
                return BadRequest("El pasaporte no tiene un usuario asociado.");
            }

            var pasaportesUsuario = _dbContext.Pasaportes.Where(p => p.IdUsuario == usuarioId).ToList();

            if (!pasaportesUsuario.Any())
            {
                return NotFound("No se encontraron pasaportes para el usuario.");
            }

            if (pasaporte.Estado)
            {
                //deshabilitamos
                pasaporte.Estado = false;
            }
            else
            {
                // Inactivo, se deshabilitan los demas pasaportes
                foreach (var p in pasaportesUsuario)
                {
                    p.Estado = false;
                }

                // se activa
                pasaporte.Estado = true;
            }

            _dbContext.SaveChanges();

            return Ok(new { mensaje = "Estado del pasaporte actualizado correctamente.", pasaporte });
        }

        [HttpGet]
        [Route("TodosPasaportes")]
        public IActionResult TodosPasaportes()
        {
            var pasaportes = _dbContext.Pasaportes
                .Include(p => p.IdPaisNavigation)
                .Include(p => p.IdUsuarioNavigation) 
                .Select(p => new
                {
                    p.IdPasaporte,
                    p.TipoPasaporte,
                    p.FechaEmision,
                    p.FechaVencimiento,
                    p.Lugar,
                    NombrePais = p.IdPaisNavigation.NombrePais,
                    Estado = p.Estado ? "Activo" : "Inactivo",
                    NombreUsuario = p.IdUsuarioNavigation.Nombres, 
                    ApellidoUsuario = p.IdUsuarioNavigation.Apellidos 
                })
                .ToList();

            if (!pasaportes.Any())
            {
                return NotFound("No se encontraron pasaportes.");
            }

            return Ok(pasaportes);
        }

        [HttpPost]
        [Route("CrearPasaporte")]
        public async Task<IActionResult> CrearPasaporte([FromBody] Models.Pasaporte nuevoPasaporte)
        {
            if (nuevoPasaporte == null)
            {
                return BadRequest("Los datos del pasaporte son inválidos.");
            }

            try
            {
                _dbContext.Pasaportes.Add(nuevoPasaporte);
                await _dbContext.SaveChangesAsync();
                return Ok(new { mensaje = "Pasaporte registrado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensaje = "Error al registrar el pasaporte", error = ex.Message });
            }
        }






    }
    public class Pasaporte
    {
        public long id_pasaporte { get; set; }
        public int TipoPasaporte { get; set; }
        public DateOnly FechaEmision { get; set; }
        public DateOnly FechaVencimiento { get; set; }
        public string Lugar { get; set; }
        public int Id_pais { get; set; }
        public Pai Pais { get; set; }  
        public Guid Id_usuario { get; set; }
        public Usuario Usuario { get; set; } 
        public bool Estado { get; set; }
    }

}