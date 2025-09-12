import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import PortalSidebar from '../components/PortalSidebar'; // Ajuste o caminho se necessário
import Navbar from '../components/Navbar'; // A Navbar pode ficar aqui também
import Footer from '../components/Footer'; // E o Footer

// --- Estilização do Layout ---
const AdminContainer = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f8f9fa; 
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.main`
    flex-grow: 1;
    padding: 2rem;
    overflow-y: auto;
`;

export default function AdminLayout() {
    return (
        <AdminContainer>
            {/* A Sidebar fica fixa aqui */}
            <PortalSidebar />

            <ContentWrapper>
                <MainContent>
                    {/* O <Outlet /> é um componente especial do React Router.
                      É aqui que as nossas páginas de funcionalidades 
                      (Gerir Banners, Gerir Seções, etc.) serão renderizadas.
                    */}
                    <Outlet />
                </MainContent>
            </ContentWrapper>
        </AdminContainer>
    );
}
