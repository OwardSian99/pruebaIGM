import { Link } from 'react-router-dom';
import React from "react";
import NavBar from '../components/Navbar'
import GeneralTable from '../components/GeneralTable';
import Modal from '../components/Modal';

function UsuarioPasaportes() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(usuario)

    return (
        <>
            <NavBar />
        </>)
};
export default UsuarioPasaportes;