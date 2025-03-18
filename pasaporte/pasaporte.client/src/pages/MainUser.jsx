import { Link } from 'react-router-dom';
import React from "react";
import NavBar from '../components/Navbar'
import UpdateData from '../components/UpdateData';
import Modal from '../components/Modal';

function MainUser() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(usuario)
    
    return (
        <>
            <NavBar />
            <UpdateData />            
        </>)
};
export default MainUser;