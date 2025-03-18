using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pasaporte.Server.Models;
using System.Security.Cryptography;


namespace pasaporte.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IgmDbContext _dbContext;

        public UsuarioController(IgmDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        [Route("ObtenerUsuarios")]
        public IActionResult ObtenerUsuarios()
        {
           
            List<Usuario> lista = _dbContext.Usuarios
                .Include(u => u.Pasaportes) 
                .ToList();

            
            var listaTransformada = lista.Select(usuario => new
            {
                usuario.IdUsuario,
                usuario.Nombres,
                usuario.Apellidos,
                usuario.Email,
                Estado = usuario.Estado ? "Activo" : "Inactivo",
                Rol = usuario.Rol ? "Administrador" : "Ciudadano",
                Pasaportes = usuario.Pasaportes.Select(p => new
                {
                    p.IdPasaporte,
                    p.TipoPasaporte,
                    p.FechaEmision,
                    p.FechaVencimiento,
                    p.Lugar,
                    Estado = p.Estado ? "Activo" : "Inactivo"
                }).ToList()
            }).ToList();
            return StatusCode(StatusCodes.Status200OK, listaTransformada);
        }



        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.IdUsuario) || string.IsNullOrEmpty(loginRequest.Contrasenia))
            {
                return BadRequest("Debe proporcionar un correo y una contraseña.");
            }

            var usuario = _dbContext.Usuarios.FirstOrDefault(u => u.IdUsuario.ToString() == loginRequest.IdUsuario);
            if (usuario == null)
            {
                return Unauthorized("Credenciales inválidas.");
            }

            if (!usuario.Estado)
            {
                return Unauthorized("Usuario Desactivado.");
            }

            if (!VerificarContrasenia(loginRequest.Contrasenia, usuario.Contrasenia))
            {
                return Unauthorized("Credenciales inválidas.");
            }

            return Ok(new 
            {   mensaje = "Login exitoso", 
                usuario = usuario.IdUsuario, 
                nombre = usuario.Nombres,
                apellido = usuario.Apellidos,
                email = usuario.Email,
                rol = usuario.Rol,
                estado = usuario.Estado
            });
        }


        private bool VerificarContrasenia(string contrasenia, string contraseniaDb)
        {
            var hash = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(contrasenia));
            var hashBase64 = Convert.ToBase64String(hash);
            return hashBase64 == contraseniaDb;
        }


        [HttpPost("Registrar")]
        public async Task<IActionResult> RegistrarUsuario([FromBody] Usuario usuario)
        {
            
            try
            {
                bool existe = await _dbContext.Usuarios.AnyAsync(u => u.Email == usuario.Email);
                if (existe)
                {
                    return Conflict(new { mensaje = "El correo ya está registrado" });
                }

                usuario.Contrasenia = Convert.ToBase64String(SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(usuario.Contrasenia)));
                usuario.Rol = false;
                usuario.Estado = true;
                
                _dbContext.Usuarios.Add(usuario);
                await _dbContext.SaveChangesAsync();
                var usuarioRegistrado = await _dbContext.Usuarios
                    .FirstOrDefaultAsync(u => u.Email == usuario.Email);

                return Ok(new { mensaje = "Usuario registrado exitosamente",  usuario = usuarioRegistrado });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensaje = "Error interno del servidor", error = ex.Message });
            }
        }

        [HttpGet]
        [Route("ObtenerUsuario/{id}")]
        public IActionResult ObtenerUsuario(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Debe proporcionar un ID de usuario válido.");
            }

            var usuario = _dbContext.Usuarios.FirstOrDefault(u => u.IdUsuario.ToString() == id);

            if (usuario == null)
            {
                return NotFound("Usuario no encontrado.");
            }

            return Ok(new
            {
                idUsuario = usuario.IdUsuario,
                nombre = usuario.Nombres,
                apellido = usuario.Apellidos,
                email = usuario.Email,
                rol = usuario.Rol,
                estado = usuario.Estado
            });
        }

        [HttpPut]
        [Route("ActualizarUsuario")]
        public async Task<IActionResult> ActualizarUsuario([FromBody] ActualizarUsuarioRequest usuarioActualizarRequest)
        {
            if (usuarioActualizarRequest == null || string.IsNullOrEmpty(usuarioActualizarRequest.IdUsuario))
            {
                return BadRequest("Debe proporcionar un ID de usuario válido.");
            }

            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(u => u.IdUsuario.ToString() == usuarioActualizarRequest.IdUsuario);
            if (usuario == null)
            {
                return NotFound("Usuario no encontrado.");
            }

            usuario.Nombres = usuarioActualizarRequest.Nombres ?? usuario.Nombres;
            usuario.Apellidos = usuarioActualizarRequest.Apellidos ?? usuario.Apellidos;
            usuario.Email = usuarioActualizarRequest.Email ?? usuario.Email;

            //validación de la nueva contraseña
            if (!string.IsNullOrEmpty(usuarioActualizarRequest.Contrasena))
            {
                usuario.Contrasenia = Convert.ToBase64String(SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(usuarioActualizarRequest.Contrasena)));
            }

            try
            {
                _dbContext.Usuarios.Update(usuario);
                await _dbContext.SaveChangesAsync();

                return Ok(new { mensaje = "Usuario actualizado exitosamente", usuario = usuario });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensaje = "Error interno del servidor", error = ex.Message });
            }
        }

        [HttpPut]
        [Route("EstadoUsuario/{idUsuario}")]
        public IActionResult ActualizarEstadoUsuario(Guid idUsuario)
        {
            var usuario = _dbContext.Usuarios.FirstOrDefault(p => p.IdUsuario == idUsuario);

            if (usuario == null)
            {
                return NotFound("El usuario no existe.");
            }

            if (usuario.Estado)
            {
                //deshabilitamos
                usuario.Estado = false;
            }
            else
            {
                usuario.Estado = true;
            }

            _dbContext.SaveChanges();

            return Ok(new { mensaje = "Estado del usuario actualizado correctamente.", usuario });
        }

        [HttpPut]
        [Route("RolUsuario/{idUsuario}")]
        public IActionResult ActualizarRolUsuario(Guid idUsuario)
        {
            var usuario = _dbContext.Usuarios.FirstOrDefault(p => p.IdUsuario == idUsuario);
            
            if (usuario == null)
            {
                return NotFound("El usuario no existe.");
            }

            if (usuario.Rol)
            {
                //deshabilitamos
                usuario.Rol = false;
            }
            else
            {
                usuario.Rol = true;
            }

            _dbContext.SaveChanges();

            return Ok(new { mensaje = "Rol del usuario actualizado correctamente.", usuario });
        }


    }
    public class LoginRequest
    {
        public required string IdUsuario { get; set; }
        public required string Contrasenia { get; set; }
    }

    public class ActualizarUsuarioRequest
    {
        public required string IdUsuario { get; set; }
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public string? Email { get; set; }
        public string? Contrasena { get; set; }
    }


}

