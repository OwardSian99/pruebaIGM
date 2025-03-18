
import { useEffect, useState, useRef} from 'react';
import { Toast } from 'primereact/toast';

function UpdateData() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const [info, setInfo] = useState({
                                idUsuario: '',
                                nombres: '',
                                apellidos: '',
                                email: '',
                                contrasena: ''
                        })
    console.log(usuario)
    const toastRef = useRef(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5266/Usuario/ObtenerUsuario/${usuario.usuario}`);

                if (!response.ok) {
                    throw new Error("Error al obtener el usuario");
                }

                const data = await response.json();
                setInfo({
                    idUsuario: data.idUsuario || '',
                    nombres: data.nombre || '',
                    apellidos: data.apellido || '',
                    email: data.email || '',
                    contrasena: ''
                });
                console.log("Usuario obtenido:", data);
            } catch (error){
                console.log(error)
            }
        }
        fetchData();            
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("Datos actualizados:", info);

        const response = await fetch("http://localhost:5266/Usuario/ActualizarUsuario", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        });

        if (!response.ok) {
            toastRef.current.show({
                severity: 'error',
                summary: 'Error',
                detail: `La actualización de datos fue erronea`,
                sticky: 5000
            });
        } else {
            toastRef.current.show({
                severity: 'success',
                summary: 'Actualización exitosa',
                detail: `La actualización de sus datos fue exitosa`,
                sticky: 5000
            });
            window.location.reload(false)
        }
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
                        <span>ID</span>
                        <input type="text" className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"
                            value={info.idUsuario}
                            readOnly
                            >
                        </input>
                    </div>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Nombres</span>
                        <input type="text" className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"
                            name="nombres"
                            value={info.nombres}
                            onChange={handleInputChange}
                        ></input>
                    </div>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Apellidos</span>
                        <input type="text" className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"
                            name="apellidos"
                            value={info.apellidos}
                            onChange={handleInputChange}
                        ></input>
                    </div>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span>Correo electrónico</span>
                        <input type="email" className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"
                            name="email"
                            value={info.email}
                            onChange={handleInputChange}>
                        </input>
                    </div>
                    <div className="flex flex-col text-2x1
                     text-left gap-1">
                        <span> Nueva Contrasena</span>
                        <input type="password" className="rounded-md
                            p-1 border-2 outline-none
                            focus:border-cyan-400 focus:bg-slate-50"
                            name="contrasena" 
                            value={info.contrasena}
                            onChange={handleInputChange}>
                        </input>
                    </div>

                    <button className="px-10 py-2 text-2x1 rounded-md
                        bg-gradient-to-tr from-green-400 to-blue-500
                        hover:from-pink-500 hover:to-yellow-500 text-white">Actualizar
                    </button>
                </form>
            </div>
            <Toast ref={toastRef} position="top-left" />
        </section>
    );
}

export default UpdateData;