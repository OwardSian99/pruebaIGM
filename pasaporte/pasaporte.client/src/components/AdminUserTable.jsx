import React, { useState, useRef } from "react";
import GeneralTable from "./GeneralTable";
import { Toast } from 'primereact/toast';

function AdminUserTable({ columns, data, actions, pasaportes, roles }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toastRef = useRef(null);

    // Función para abrir el modal y mostrar los pasaportes del usuario seleccionado
    const handleViewPassports = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

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
        <div className="p-8">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            {columns.map((col, index) => (
                                <th key={index} className="border border-gray-300 px-4 py-2">{col.header}</th>
                            ))}
                            {actions.length > 0 && <th className="border border-gray-300 px-4 py-2">Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="text-center">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                        {row[col.field]}
                                    </td>
                                ))}
                                {actions.length > 0 && (
                                    <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                        {actions.map((action, actionIndex) => (
                                            <button
                                                key={actionIndex}
                                                onClick={() => action.onClick(row)}
                                                className={`py-1 px-3 rounded ${row.estado === "Inactivo"
                                                    ? "bg-green-500 hover:bg-green-700 text-white"
                                                    : "bg-red-500 hover:bg-red-700 text-white"}`}
                                            >
                                                {row.estado === "Inactivo"
                                                    ? "Habilitar"
                                                    : "Deshabilitar"}
                                            </button>
                                        ))}
                                    </td>
                                )}
                                {pasaportes.length > 0 && (
                                    <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                        {pasaportes.map((action, actionIndex) => (
                                            <button
                                                key={actionIndex}
                                                onClick={() => handleViewPassports(row)}
                                                className={`py-1 px-2 rounded ${action.className}"`}
                                            >
                                                {"Ver Pasaportes"}
                                            </button>

                                        ))}
                                    </td>
                                )}
                                {roles.length > 0 && (
                                    <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                        {roles.map((action, actionIndex) => (
                                            <button
                                                key={actionIndex}
                                                onClick={() => action.onClick(row)}
                                                className={`py-1 px-2 rounded ${action.className}"`}
                                            >
                                                {"Cambiar Rol"}
                                            </button>

                                        ))}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-300">
                        <h2 className="text-xl font-bold mb-4">Pasaportes de {selectedUser.nombres}</h2>
                        {selectedUser.pasaportes && selectedUser.pasaportes.length > 0 ? (
                            <GeneralTable
                                columns={[
                                    { header: "ID", field: "idPasaporte" },
                                    { header: "Tipo", field: "tipoPasaporte" },
                                    { header: "Fecha Emision", field: "fechaEmision" },
                                    { header: "Fecha Vencimiento", field: "fechaVencimiento" },
                                    { header: "Lugar", field: "lugar" },
                                    { header: "Pais", field: "nombrePais" },
                                    { header: "Estado", field: "estado" }

                                ]}
                                data={selectedUser.pasaportes}
                                actions={[
                                    { label: "", onClick: handleEstado, className: "" }
                                ]}
                            />
                        ) : (
                            <p>No tiene pasaportes registrados.</p>
                        )}
                        <button
                            onClick={closeModal}
                            className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
            <Toast ref={toastRef} position="top-left" />
        </div>

    );
}

export default AdminUserTable;
