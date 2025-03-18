
//import { useState } from 'react';
import { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        contrasenia: ""
    });
    
    const toastRef = useRef(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5266/Usuario/Registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log(formData)

            const data = await response.json();
            if (response.ok) {
                //console.log(data.usuario)
                toastRef.current.show({
                    severity: 'success',
                    summary: 'Registro exitoso',
                    detail: `${data.mensaje} \nSu ID para iniciar sesión es: ${data.usuario.idUsuario}`,
                    sticky:true
                });
            } else {
                toastRef.current.show({
                    severity: 'error',
                    summary: 'Error al registrar',
                    detail: data.mensaje || "Error al registrar usuario",
                    sticky: true
                });
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            toastRef.current.show({
                severity: 'error',
                summary: 'error',
                detail: 'No se pudo conectar al servidor',
                sticky: true
            });
        }
    };
    return (
        <>
        <section className="min-h-screen flex items-center
            justify-center font-mono
            bg-gradient-to-r from-cyan-500 from-10%
            via-indigo-500 via-50% to-sky-500 to-100%">
            <div className="flex shadow-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col items-center
                    justify-center text-center p-15 gap-3.5
                    bg-white rounded">

                    <h1 className="text-5xl font-bold">Crear Cuenta</h1>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Nombres</span>
                        <input type="text"
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                            className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"
                            required>
                        </input>
                    </div>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Apellidos</span>
                        <input type="text"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"></input>
                    </div>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Correo electrónico</span>
                        <input type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"
                            required>
                        </input>
                    </div>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Contrasena</span>
                        <input type="password"
                            name="contrasenia"
                            value={formData.contrasenia}
                            onChange={handleChange}
                            className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"
                            required>
                        </input>
                    </div>
                    
                    <button type = "submit" className="px-10 py-2 text-2x1 rounded-md
                        bg-gradient-to-tr from-green-400 to-blue-500
                        hover:from-pink-500 hover:to-yellow-500 text-white">Registrar
                    </button>
                    <p><a href="/" className="text-blue-400
                        hover:underline">Inicia sesion</a></p>
                </form>
                </div>

                <Toast ref={toastRef} position="top-left" />
            
            </section>
        </>
    );
}

export default Signup;