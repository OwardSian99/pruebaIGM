import { useEffect, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import NavBar from '../components/Navbar';

function NuevoPasaporte() {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [selectedPais, setSelectedPais] = useState(null);
    const [selectedTipoPasaporte, setSelectedTipoPasaporte] = useState(null);
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    const [lugar, setLugar] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5266/Usuario/ObtenerUsuarios`);
                if (!response.ok) {
                    throw new Error("Error al obtener los usuarios");
                }
                const data = await response.json();
                console.log("data",data)
                
                const usuariosTransformados = data.map(usuario => ({
                    label: `${usuario.nombres} ${usuario.apellidos}`,
                    value: usuario.idUsuario, 
                    ...usuario 
                }));

                setUsuarios(usuariosTransformados);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    const tiposPasaporte = [
        { label: "Ordinario", value: 1 },
        { label: "Diplomatico", value: 2 },
        { label: "Oficial", value: 3 },
        { label: "Temporales", value: 4 }
    ];

    const paises = [
        { label: "Guatemala", value: 4 },
        { label: "El Salvador", value: 3 },
        { label: "Honduras", value: 5 },
        { label: "Nicaragua", value: 6 },
        { label: "Costa Rica", value: 2 },
        { label: "Panama", value: 7 },
        { label: "Belice", value: 1 }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pasaporteData = {
            idUsuario: selectedUsuario,
            tipoPasaporte: selectedTipoPasaporte,
            fechaEmision: new Date().toISOString().split('T')[0],
            fechaVencimiento: fechaVencimiento,
            lugar: lugar,
            idPais: selectedPais,
            estado: false
        };

        try {
            console.log(pasaporteData)
            const response = await fetch("http://localhost:5266/Pasaporte/CrearPasaporte", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pasaporteData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Pasaporte registrado exitosamente");
            } else {
                console.log(result)
                alert("Error: " + result);
            }
        } catch (error) {
            console.error("Error al registrar el pasaporte:", error);
            alert("Hubo un problema al enviar los datos.");
        }
    };


    return (
        <>
            <NavBar />
            <section className="min-h-screen flex items-center
            justify-center font-mono">
                <div className="flex shadow-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center
                        justify-center text-center p-15 gap-2.5 bg-blue-300 rounded">

                        <h1 className="text-5xl font-bold">Nuevo Pasaporte</h1>

                        <div className="flex flex-col text-2x1 text-left gap-1">
                            <span>Usuario</span>
                            <Dropdown
                                value={selectedUsuario}
                                options={usuarios}
                                onChange={(e) => setSelectedUsuario(e.value)}
                                optionLabel="label"
                                placeholder="Seleccione un usuario"
                                className="w-60"
                            />
                        </div>

                        <div className="flex flex-col text-2x1 text-left gap-1">
                            <span>Tipo de Pasaporte</span>
                            <Dropdown
                                value={selectedTipoPasaporte}
                                options={tiposPasaporte}
                                onChange={(e) => setSelectedTipoPasaporte(e.value)}
                                optionLabel="label"
                                placeholder="Seleccione un tipo"
                                className="w-60"
                            />
                        </div>

                        <div className="flex flex-col text-2x1 text-left gap-1">
                            <span>Fecha de Vencimiento</span>
                            <input type="date"
                                className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
                                value={fechaVencimiento}
                                min={new Date().toISOString().split("T")[0]} // Solo permite fechas futuras
                                onChange={(e) => setFechaVencimiento(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col text-2x1 text-left gap-1">
                            <span>Lugar</span>
                            <input type="text"
                                className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
                                value={lugar}
                                onChange={(e) => setLugar(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col text-2x1 text-left gap-1">
                            <span>País</span>
                            <Dropdown
                                value={selectedPais}
                                options={paises}
                                onChange={(e) => setSelectedPais(e.value)}
                                optionLabel="label"
                                placeholder="Seleccione un país"
                                className="w-60"
                            />
                        </div>

                        <button className="px-10 py-2 text-2x1 rounded-md
                            bg-gradient-to-tr from-green-400 to-blue-500
                            hover:from-pink-500 hover:to-yellow-500 text-white">
                            Guardar Pasaporte
                        </button>

                    </form>
                </div>
            </section>
        </>
    );
}

export default NuevoPasaporte;
