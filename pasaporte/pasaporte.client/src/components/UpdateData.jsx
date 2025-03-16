
//import { useState } from 'react';

function UpdateData() {
    const handleSubmit = async (e) => {
        console.log("xd", e)
    };
    return (

        <section className="min-h-screen flex items-center
            justify-center font-mono">
            <div className="flex shadow-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col items-center
                    justify-center text-center p-15 gap-3.5
                    bg-blue-300 rounded">

                    <h1 className="text-5xl font-bold">Actualizar Datos</h1>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Nombres</span>
                        <input type="text" className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"></input>
                    </div>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Apellidos</span>
                        <input type="password" className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"></input>
                    </div>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Correo electrónico</span>
                        <input type="password" className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"></input>
                    </div>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Contrasena</span>
                        <input type="password" className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"></input>
                    </div>

                    <button className="px-10 py-2 text-2x1 rounded-md
                        bg-gradient-to-tr from-green-400 to-blue-500
                        hover:from-pink-500 hover:to-yellow-500 text-white">Registrar
                    </button>
                </form>
            </div>
        </section>
    );
}

export default UpdateData;