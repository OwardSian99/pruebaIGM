import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowAdmin, allowCitizen, redirectTo = "/" }) => {
    const userData = JSON.parse(localStorage.getItem("usuario")); 
    const userRole = userData?.rol; 

    if ((allowAdmin && userRole === true) || (allowCitizen && userRole === false)) {
        return <Outlet />;
    }

    return <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
