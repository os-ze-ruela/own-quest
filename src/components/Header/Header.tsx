import { Link } from "react-router-dom";
import LOGO from "../../assets/img/ownquest-logo.png";
import { LANDING_PAGE } from "../../core/app-urls";
import { ButtonStyle, HeaderActions, HeaderStyle, LinkStyle, LogoStyle } from '../../styles/Header';

interface HeaderProps { page: string, redirect: string }

function Header(props: HeaderProps) {


    return (
        <HeaderStyle>
            <a href={LANDING_PAGE}>
                <LogoStyle src={LOGO} alt="Logo" />
            </a>
            <HeaderActions>
                <LinkStyle href="/#functions" >Funcionalidades</LinkStyle>
                <LinkStyle>Sobre Nós</LinkStyle>
                <Link to={props.redirect}>
                    <ButtonStyle onClick={() => { }}>{props.page}</ButtonStyle>
                </Link>
            </HeaderActions>
        </HeaderStyle>
    )
}

export default Header