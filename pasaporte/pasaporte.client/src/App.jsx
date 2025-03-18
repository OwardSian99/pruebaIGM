import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import MainUser from './pages/MainUser.jsx';
import UsuarioPasaportes from './pages/UsuarioPasaportes.jsx';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';
import AdminUsuarios from './pages/AdminUsuarios.jsx';
import AdminPasaportes from './pages/AdminPasaportes.jsx'
import NuevoPasaporte from './pages/NuevoPasaporte.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
    

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/main" element={<MainUser />}></Route>
                    <Route path="/UsuarioPasaportes" element={<UsuarioPasaportes />}></Route>
                    <Route path="/AdminPasaportes" element={<AdminPasaportes />}></Route>
                    <Route path="/AdminUsuarios" element={<AdminUsuarios />}></Route>
                    <Route path="/NuevoPasaporte" element={<NuevoPasaporte />}></Route>
                </Routes>
            </Router>
        </>
    );
    
   
}

export default App;