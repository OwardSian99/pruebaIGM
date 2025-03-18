import React, { useEffect, useState, useRef } from "react";
import NavBar from '../components/Navbar'
import { Toast } from 'primereact/toast';
import AdminUserTable from "../components/AdminUserTable";

function AdminUsuarios() {
    //const usuario = JSON.parse(localStorage.getItem("usuario"));
    const toastRef = useRef(null);
    const [pasaportes, setPasaportes] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5266/Usuario/ObtenerUsuarios`);

                if (!response.ok) {
                    throw new Error("Error al obtener el usuario");
                }
                const data = await response.json();
                setPasaportes(data);
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);


    const handleEstado = async (usuario) => {
        console.log(`Eliminar usuario: ${usuario.estado} ${usuario.usuario}`);

        const response = await fetch(`http://localhost:5266/Usuario/EstadoUsuario/${usuario.idUsuario}`, {
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


    const handleRoles = async (usuario) => {
        console.log(`Eliminar usuario: ${usuario.estado} ${usuario.idUsuario}`);

        const response = await fetch(`http://localhost:5266/Usuario/RolUsuario/${usuario.idUsuario}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            toastRef.current.show({
                severity: 'error',
                summary: 'Error',
                detail: `La actualización de rol fue erronea`,
                sticky: 5000
            });
        } else {
            toastRef.current.show({
                severity: 'success',
                summary: 'Actualización exitosa',
                detail: `La actualización del rol fue exitosa`,
                sticky: 5000
            });
           window.location.reload(false)
        }
    };

    const handlePasaportes = () => {
        console.log("Ver pasaportes de usuario")
    };

    return (
        <>
            <NavBar />
            <AdminUserTable
                columns={[
                    { header: "ID", field: "idUsuario" },
                    { header: "Nombre", field: "nombres" },
                    { header: "Apellidos", field: "apellidos" },
                    { header: "Email", field: "email" },
                    { header: "Rol", field: "rol" },
                    { header: "Estado", field: "estado" }

                ]}
                data={pasaportes}
                actions={[
                    { label: "", onClick: handleEstado, className: "" }
                ]}
                pasaportes={[
                    { label: "Ver Pasaportes", onClick: handlePasaportes, className: "bg-blue-400 hover:bg-blue-600 text-white" }
                ]}
                roles={[
                    { label: "Cambiar Rol", onClick: handleRoles, className: "bg-green-400 hover:bg-green-600 text-white" }
                ]}
            />
            <Toast ref={toastRef} position="top-left" />
        </>)
};
export default AdminUsuarios;