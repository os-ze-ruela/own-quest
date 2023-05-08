import { useContext } from 'react';
import { BiArrowBack } from "react-icons/bi";
import Header from '../../components/Header/Header';
import HeaderLogged from '../../components/Header/HeaderLogged';
import { AuthContext } from '../../contexts/auth';
import { EXPLORER, LOGIN } from '../../core/app-urls';
import { BackButtonWrapper, GameInfosMain, GameInfosWrapper, GameTitle } from '../../styles/GameInfos';

export const GameInfos = () => {

    const { authenticated, user } = useContext(AuthContext)

    return (
        <>
            {authenticated ?
                (<HeaderLogged nickname={user!.nickname} photo={user!.photo} />) :
                (<Header page='Login' redirect={LOGIN} />)
            }
            <GameInfosMain>
                <BackButtonWrapper href={EXPLORER}>
                    <BiArrowBack/>
                    <p>Voltar</p>
                </BackButtonWrapper>
                <GameTitle>Game Title</GameTitle>
                <GameInfosWrapper>
                    
                </GameInfosWrapper>
            </GameInfosMain>
        </>
    );
}