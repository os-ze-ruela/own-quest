import React from 'react';
import { GAME, PLAYGAME } from '../../core/app-urls';
import { CardUserGameImage } from '../../styles/HomeLogged';
import { ButtonPlaying, ButtonPlayingWrapper, CardContinuePlayingWrapper, CardPlayGameTitle, CardPlayingGameContentWrapper, GamePlayingImageSpace } from '../../styles/components/CardContinuePlaying';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';
import { PlayGamesContext } from '../../contexts/play-games';
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../../contexts/auth';

type CardContinuePlayingProps = {
    idPlayingGame: number;
    idGame: number;
    title: string;
    description: string;
    image: string;
    initiatedPlay: Date;
};

const CardContinuePlayingGame: React.FC<CardContinuePlayingProps> = ({ idPlayingGame, idGame, title, description, image, initiatedPlay }) => {

    const { playGame, setCurrentPlayingPage, getResumePlayedGame, setHistoricGameId, setPlayGameId, finishAndPlay} = useContext(PlayGamesContext)
    const navigate = useNavigate()
    const { authenticated, user } = useContext(AuthContext)

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      
        return formattedDate;
    }

    const handleResumeGame = async () => {
        
        try {
            const response = await getResumePlayedGame(user!.id, idGame)
            console.log(response)
            if(response.data.is_ongoing === true){
                setPlayGameId(response.data.play_game_id)
                setCurrentPlayingPage(response.data.historic_last_page.page_game_id)
                setHistoricGameId(response.data.historic_last_page.id)
                navigate(PLAYGAME + '/' + idGame + '?test=false');
            }
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <CardContinuePlayingWrapper>
            <GamePlayingImageSpace>
                {image ?
                    <CardUserGameImage src={image} alt={title} />
                    :
                    <ImagePlaceholder />
                }
            </GamePlayingImageSpace>
            <CardPlayingGameContentWrapper>
                <CardPlayGameTitle>{title}</CardPlayGameTitle>
                <p className='description'>{`Iniciado em: ${formatDate(initiatedPlay.toString())}`}</p>
                <ButtonPlayingWrapper className='button-wrapper'>
                    <ButtonPlaying href={PLAYGAME + '/' + idGame + '?test=false'} >{'Continuar Jogando'}</ButtonPlaying>
                </ButtonPlayingWrapper>
            </CardPlayingGameContentWrapper>
        </CardContinuePlayingWrapper>
    );
};

export default CardContinuePlayingGame;

