import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import MainUser from './pages/MainUser.jsx';
import UsuarioPasaportes from './pages/UsuarioPasaportes.jsx';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';

function App() {
    

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/main" element={<MainUser />}></Route>
                    <Route path="/UsuarioPasaportes" element={<UsuarioPasaportes />}></Route>
                </Routes>
            </Router>
        </>
    );
    
   
}

export default App;