import { Link } from "react-router-dom";
import LOGO from "../../assets/img/ownquest-logo.png";
import { ButtonStyle, HeaderActions, HeaderStyle, LinkStyle, LogoStyle } from '../../styles/Header';

interface HeaderProps {page: string, redirect: string}

function Header(props: HeaderProps) {
   

    return (
        <HeaderStyle>
            <a href='/'>
            <LogoStyle src={LOGO} alt="Logo" />
            </a>
            <HeaderActions>
                <LinkStyle href="/#functions" >Funcionalidades</LinkStyle>
                <LinkStyle>Sobre Nós</LinkStyle>
                <Link to={props.redirect}>
                <ButtonStyle onClick={() => {}}>{props.page}</ButtonStyle>
                </Link>
            </HeaderActions>
        </HeaderStyle>
    )
}

export default Header