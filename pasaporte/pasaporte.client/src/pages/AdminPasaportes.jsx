import React, { useEffect, useState, useRef } from "react";
import NavBar from '../components/Navbar'
import { Toast } from 'primereact/toast';
import GeneralTable from '../components/GeneralTable';

function AdminPasaportes() {
    //const usuario = JSON.parse(localStorage.getItem("usuario"));
    const toastRef = useRef(null);
    const [pasaportes, setPasaportes] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5266/Pasaporte/TodosPasaportes`);

                if (!response.ok) {
                    throw new Error("Error al obtener el usuario");
                }

                const data = await response.json();
                setPasaportes(data);
                console.log("Usuario obtenido:", data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);


    
    const handleEstado = async (pasaporte) => {
        console.log(`Eliminar usuario: ${pasaporte.estado}`);

        const response = await fetch(`http://localhost:5266/Pasaporte/EstadoPasaporte/${pasaporte.idPasaporte}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            toastRef.current.show({
                severity: 'error',
                summary: 'Error',
                detail: `La actualización de estado fue erronea`,
                sticky: 5000
            });
        } else {
            toastRef.current.show({
                severity: 'success',
                summary: 'Actualización exitosa',
                detail: `La actualización del estado fue exitosa`,
                sticky: 5000
            });
            window.location.reload(false)
        }
    };

    

    return (
        <>
            <NavBar />
            <GeneralTable
                columns={[
                    { header: "ID", field: "idPasaporte" },
                    { header: "Tipo", field: "tipoPasaporte" },
                    { header: "Fecha Emision", field: "fechaEmision" },
                    { header: "Fecha Vencimiento", field: "fechaVencimiento" },
                    { header: "Lugar", field: "lugar" },
                    { header: "Pais", field: "nombrePais" },
                    { header: "Estado", field: "estado" },
                    { header: "Nombre ", field: "nombreUsuario" },
                    { header: "Apellidos", field: "apellidoUsuario" },

                ]}
                data={pasaportes}
                actions={[
                    { label: "", onClick: handleEstado, className: "" }
                ]}
            />
            <Toast ref={toastRef} position="top-left" />
        </>)
};
export default AdminPasaportes;