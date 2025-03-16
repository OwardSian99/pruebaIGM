import { Link } from 'react-router-dom';
import React, { useState } from "react";
import NavBar from '../components/Navbar'
import GeneralTable from '../components/GeneralTable';
import UpdateData from '../components/UpdateData';
import Modal from '../components/Modal';

function MainUser() {
    const [users, setUsers] = useState([
        { id: 1, name: "Juan Pérez", role: "Administrador" },
        { id: 2, name: "Ana López", role: "Editor" },
        { id: 3, name: "Carlos Rodríguez", role: "Usuario" }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };
    const handleDelete = (user) => {
        console.log(`Eliminar usuario: ${user.name}`);
        setUsers(users.filter((u) => u.id !== user.id));
    };
    
    return (
        <>
            <NavBar />
            <GeneralTable
                columns={[
                    { header: "ID", field: "id" },
                    { header: "Nombre", field: "name" },
                    { header: "Rol", field: "role" }
                ]}
                data={users}
                actions={[
                    { label: "Editar", onClick: handleEdit, className: "bg-blue-500 hover:bg-blue-700 text-white" },
                    { label: "Eliminar", onClick: handleDelete, className: "bg-red-500 hover:bg-red-700 text-white" }
                ]}
            />
            {selectedUser && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={selectedUser}
                    onSave={(updatedUser) => {
                        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
                        setIsModalOpen(false);
                    }}
                />
            )}
            <UpdateData />


            
        </>)
};
export default MainUser;