import styled from 'styled-components';
import logo from '../assets/imgs/logo_sem_fundo.png';
import sair from '../assets/imgs/icon_sair.png';

const SidebarDiv = styled.div`
    width: 25%;
    height: 100vh;
    position: fixed;
    background-color: #F2B924;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    left: 0;
    padding: 0 2% 0 2%;
`

const LogoDiv = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: left;
`

const Logo = styled.img `
    height: 70px;
`

const Opcoes = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
`

const Opcao = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left; 
    line-height: 40px;
    margin: 5% 0 5% 0;
`

const DropdownBtn = styled.button`
    text-decoration: none;
    font-size: 16px;
    color: #E1346A;
    display: block;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    outline: none;
`

const DropdownContent = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
`

const Link = styled.a`
    color: #FFFFFF;
    text-decoration: none;
`

const Sair = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
`

const SairLink = styled.a`
    color: #E3271E;
    text-decoration: none;
`

const SairIcon = styled.img`
    height: 16px;
`

export default function PortalSidebar() {

    return (
        <SidebarDiv>
            <LogoDiv>
                <Logo src={logo}/>
            </LogoDiv>

            <Opcoes>
                <Opcao>
                    <DropdownBtn>Recados e conteúdos</DropdownBtn>
                    <DropdownContent>
                        <Link href="#">Recados gerais</Link>
                        <Link href="#">Criar novo recado</Link>
                        <Link href="#">Conteúdos</Link>
                        <Link href="#">Postar novo conteúdo</Link>
                    </DropdownContent>
                </Opcao>
                <Opcao>
                    <DropdownBtn>Frequência</DropdownBtn>
                    <DropdownContent>
                        <Link href="#">Verificar frequência</Link>
                        <Link href="#">Lançar frequência</Link>
                    </DropdownContent>
                </Opcao>
                <Opcao>
                    <DropdownBtn>Notas</DropdownBtn>
                    <DropdownContent>
                        <Link href="#">Ver notas</Link>
                        <Link href="#">Lançar notas</Link>
                        <Link href="#">Criar nova avaliação</Link>
                        <Link href="#">Avaliações cadastradas</Link>
                    </DropdownContent>
                </Opcao>
                <Opcao>
                    <DropdownBtn>Seu perfil</DropdownBtn>
                </Opcao>
            </Opcoes>

            <Sair>
                <SairLink href="/home">Sair <SairIcon src={sair}/></SairLink>
            </Sair>
        </SidebarDiv>
    );
}