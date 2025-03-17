using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pasaporte.Server.Models;
using System.Security.Cryptography;
using System.Text;



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
            List<Usuario> lista = _dbContext.Usuarios.ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpGet]
        [Route("Login")]
        public IActionResult Login()
        {
            return StatusCode(StatusCodes.Status200OK);
        }

        public bool VerificarContrasenia(string contrasenia, string contraseniaDb)
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


    }
}
