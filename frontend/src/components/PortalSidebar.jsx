import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// --- Estilização da Sidebar ---

const SidebarContainer = styled.aside`
    width: 280px;
    background-color: #f2b924; 
    color: #4a4a4a;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
    flex-shrink: 0; 
`;

const LogoContainer = styled.div`
    display: flex;
    align-items:center;
    padding: 0rem 2rem 2rem 2rem;
`;

const LogoContainerImg = styled.img`
    max-width: 60%;
`;

const NavMenu = styled.nav`
    flex-grow: 1;
`;

const NavItem = styled.div`
    padding: 0 1.5rem;
`;

const NavButton = styled.button`
    width: 100%;
    background: none;
    border: none;
    padding: 0.8rem 0;
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
    color: #4a4a4a;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        opacity: 0.8;
    }
`;

const DropdownMenu = styled.div`
    padding-left: 1rem; // Indentação para os sub-links
    max-height: ${props => (props.isOpen ? '500px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
`;

// Usamos NavLink para que ele receba uma classe 'active' automaticamente
const NavLinkStyled = styled(NavLink)`
    display: block;
    padding: 0.6rem 0;
    color: #4a4a4a;
    text-decoration: none;
    border-radius: 5px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    &.active {
        font-weight: bold;
        color: black;
    }
`;

const LogoutButton = styled.button`
    background: none;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 1.5rem;
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
    color: #4a4a4a;
    cursor: pointer;
    
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

// Componente para um item de menu com dropdown
const DropdownItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <NavButton onClick={() => setIsOpen(!isOpen)}>
                {title}
                <span>{isOpen ? '▲' : '▼'}</span>
            </NavButton>
            <DropdownMenu isOpen={isOpen}>
                {children}
            </DropdownMenu>
        </div>
    );
};


export default function PortalSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user_token');
        navigate('/admin');
    };

    return (
        <SidebarContainer>
            <LogoContainer>
                <LogoContainerImg src="/src/assets/favicon.png" alt="Logo" />
            </LogoContainer>
            <NavMenu>
                <NavItem>
                    <DropdownItem title="Página Inicial">
                        <NavLinkStyled to="/admin/secoes">Seções Cadastradas</NavLinkStyled>
                        <NavLinkStyled to="/admin/banners">Gerir Banners</NavLinkStyled>
                    </DropdownItem>
                </NavItem>
                <NavItem>
                     <DropdownItem title="Educadores Populares">
                        <NavLinkStyled to="#">Novas Candidaturas</NavLinkStyled>
                        <NavLinkStyled to="#">Educadores Cadastrados</NavLinkStyled>
                    </DropdownItem>
                </NavItem>
                 <NavItem>
                     <DropdownItem title="Controle de Alunos">
                        <NavLinkStyled to="#">Novas Matrículas</NavLinkStyled>
                        <NavLinkStyled to="#">Alunos Matriculados</NavLinkStyled>
                    </DropdownItem>
                </NavItem>
                 <NavItem>
                     <DropdownItem title="Redes Sociais">
                        <NavLinkStyled to="#">Redes Cadastradas</NavLinkStyled>
                        <NavLinkStyled to="#">Cadastrar Nova Rede</NavLinkStyled>
                    </DropdownItem>
                </NavItem>
            </NavMenu>
            <LogoutButton onClick={handleLogout}>
                Sair ➔
            </LogoutButton>
        </SidebarContainer>
    );
}
