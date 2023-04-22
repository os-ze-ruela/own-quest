import { Link } from "react-router-dom";
import LOGO from "../../assets/img/ownquest-logo.png";
import { ButtonStyle, HeaderActions, HeaderStyle, LinkStyle, LogoStyle, PerfilLink, UserImage } from '../../styles/Header';

interface HeaderProps {
    nickname: string,
    img: string
}

function HeaderLogged(props: HeaderProps) {

    return (
        <HeaderStyle>
            <a href='/'>
                <LogoStyle src={LOGO} alt="Logo" />
            </a>
            <HeaderActions>
                <LinkStyle href="/explorer" >Explorar</LinkStyle>
                <LinkStyle href="mygames">Meus Jogos</LinkStyle>
                <Link to={"/creation"}>
                    <ButtonStyle onClick={() => { }}>Criar</ButtonStyle>
                </Link>
                <PerfilLink>
                    <UserImage src={props.img} alt="Perfil image"/>
                    {props.nickname}
                </PerfilLink>
            </HeaderActions>
        </HeaderStyle>
    )
}

export default HeaderLogged