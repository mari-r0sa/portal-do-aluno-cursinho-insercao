import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Cadastro from './pages/Cadastro';
import LancarNotas from './pages/portal-do-aluno/LancarNotas';

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/admin" element={<AdminLogin/>}/>
                <Route path='/admin/register' element={<Cadastro/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                <Route path="/portal/notas/novo" element={<LancarNotas/>}/>
            </Routes>
        </BrowserRouter>
    );
}