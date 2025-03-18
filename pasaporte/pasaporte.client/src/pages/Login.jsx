
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
    const [id_usuario, setIdUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
        const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError("");
        localStorage.clear();


        const data = { idUsuario: id_usuario, contrasenia:password };

        try {
            const response = await fetch("http://localhost:5266/Usuario/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                               
                console.log("Usuario autenticado:", result);
                if (!result.rol) {
                    alert("Inicio de sesion exitoso")
                    console.log("usuario normal")
                    localStorage.setItem("usuario", JSON.stringify(result))
                    
                    navigate("/main")
                } else {
                    console.log("aquí va el admin")
                }
                
            } else {
                console.log(result);
               
                setError(result.mensaje || "Error al iniciar sesión");
            }
        } catch (error) {
            setError("No se pudo conectar con el servidor: " + error);
        }

        setLoading(false);
    };
    return (
        <section className="min-h-screen flex items-center
            justify-center font-mono
            bg-gradient-to-r from-cyan-500 from-10%
            via-indigo-500 via-50% to-sky-500 to-100%">
            <div className="flex shadow-2x1">
                <form onSubmit={handleSubmit} className="flex flex-col items-center
                    justify-center text-center p-20 gap-8
                    bg-white rounded">
                    
                    <h1 className="text-5xl font-bold">Login</h1>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>ID</span>
                        <input type="text"
                            value={id_usuario}
                            onChange={(e) => setIdUsuario(e.target.value)}
                            className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"
                            required>
                        </input>
                    </div>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Contrasena</span>
                        <input type="password" className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required>
                        </input>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}

                    <button type="submit"
                        disabled={loading}
                        className="px-10 py-2 text-2x1 rounded-md
                        bg-gradient-to-tr from-green-400 to-blue-500
                        hover:from-pink-500 hover:to-yellow-500 text-white">Login
                    </button>
                    {loading ? "Cargando..." : ""}

                    <p><a href="/signup" className="text-blue-400
                        hover:underline">Registrate</a></p>

                </form>
            </div>
        </section>
    );
}

export default Login;