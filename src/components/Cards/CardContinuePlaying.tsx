import React from 'react';
import { GAME, PLAYGAME } from '../../core/app-urls';
import { CardUserGameImage } from '../../styles/HomeLogged';
import { ButtonPlaying, ButtonPlayingWrapper, CardContinuePlayingWrapper, CardPlayGameTitle, CardPlayingGameContentWrapper, GamePlayingImageSpace } from '../../styles/components/CardContinuePlaying';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';

type CardContinuePlayingProps = {
    idPlayingGame: number;
    idGame: number;
    title: string;
    description: string;
    image: string;
    initiatedPlay: Date;
};

const CardContinuePlayingGame: React.FC<CardContinuePlayingProps> = ({ idPlayingGame, idGame, title, description, image, initiatedPlay }) => {

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      
        return formattedDate;
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

