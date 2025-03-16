import React from "react";

function Modal({ isOpen, onClose, user, onSave }) {
    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
                <label className="block mb-2">Nombre:</label>
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) => onSave({ ...user, name: e.target.value })}
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                />

                <label className="block mb-2">Rol:</label>
                <input
                    type="text"
                    value={user.role}
                    onChange={(e) => onSave({ ...user, role: e.target.value })}
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Guardar
                    </button>
                    <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
