import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/img/ownquest-logo.png";
import { GameContext } from "../../contexts/game";
import AppError from "../../core/app-error";
import { GAME, LANDING_PAGE } from "../../core/app-urls";
import { ButtonStyle, HeaderActions, HeaderStyle, LinkStyle, LogoStyle, PerfilLink, UserImage } from '../../styles/Header';

interface HeaderProps {
    nickname: string,
    img: string
}

function HeaderLogged(props: HeaderProps) {

    const {createGame} = useContext(GameContext)
    const navigate = useNavigate()

    return (
        <HeaderStyle>
            <a href={LANDING_PAGE}>
                <LogoStyle src={LOGO} alt="Logo" />
            </a>
            <HeaderActions>
                <LinkStyle href="/explorer" >Explorar</LinkStyle>
                <LinkStyle href="mygames">Meus Jogos</LinkStyle>
                <ButtonStyle onClick={ async () => {
                    try {
                        const id = await createGame();
                        navigate(GAME + '/' + id)
                    } catch (e) {
                        const error = await e as AppError;
                    }
                }}>Criar</ButtonStyle>
                <PerfilLink>
                    <UserImage src={props.img} alt="Perfil image" />
                    {props.nickname}
                </PerfilLink>
            </HeaderActions>
        </HeaderStyle>
    )
}

export default HeaderLogged