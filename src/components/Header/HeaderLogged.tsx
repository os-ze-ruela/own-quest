import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/img/ownquest-logo.png";
import { AuthContext } from '../../contexts/auth';
import { GameContext } from "../../contexts/game";
import { UserContext } from '../../contexts/user';
import AppError from "../../core/app-error";
import { EXPLORER, GAME, HOME, LANDING_PAGE, MYGAMES, PROFILE } from "../../core/app-urls";
import { ButtonStyle, HeaderActions, HeaderStyle, LinkStyle, LogoStyle, PerfilLink, UserImage, UserImagePlaceholder } from '../../styles/Header';

interface HeaderProps {
    nickname: string,
    photo: string
}

function HeaderLogged(props: HeaderProps) {

    const { setOpen } = useContext(UserContext)
    const { authenticated } = useContext(AuthContext)
    const { createGame } = useContext(GameContext)
    const navigate = useNavigate()

    return (
        <HeaderStyle>
            <a href={authenticated ? HOME : LANDING_PAGE}>
                <LogoStyle src={LOGO} alt="Logo" />
            </a>
            <HeaderActions>
                <LinkStyle href={EXPLORER} >Explorar</LinkStyle>
                <LinkStyle href={MYGAMES}>Meus Jogos</LinkStyle>
                <ButtonStyle onClick={async () => {
                    try {
                        const id = await createGame();
                        navigate(GAME + '/' + id)
                    } catch (e) {
                        const error = await e as AppError;
                        alert(error)
                    }
                }}>Criar</ButtonStyle>
                <PerfilLink onClick={() => {
                    console.log(window.innerWidth)
                    if (window.innerWidth < 728) {
                        setOpen(true)
                    } else {
                        navigate(PROFILE)
                    }
                }}>
                    {props.photo == null ? (
                        <>
                            <UserImagePlaceholder>
                                {props.nickname[0].toUpperCase()}
                            </UserImagePlaceholder>
                        </>
                    ) : (
                        <>
                            <UserImage src={props.photo} alt="Perfil image" />
                        </>
                    )}
                    <p className='nickname-header' >{props.nickname}</p>
                </PerfilLink>
            </HeaderActions>
        </HeaderStyle>
    )
}

export default HeaderLogged