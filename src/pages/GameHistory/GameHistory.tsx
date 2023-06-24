import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import HeaderLogged from '../../components/Header/HeaderLogged';
import CustomizedTimeline from '../../components/GameTimeline/GameTimeline';
import { AuthContext } from '../../contexts/auth';
import { GameContext } from '../../contexts/game';
import { GameHistoryDate, GameHistoryStyle, HistoryName, Title, TitleWrap } from '../../styles/GameHistory';
import { api } from '../../services/api';
import AppError from '../../core/app-error';

interface Page {
  button_answer: null | string;
  button_id: null | string;
  id: number;
  page_game_id: number;
  page_title: string;
}

interface GameHistoryData {
  game_date_play: string;
  historic: Page[];
  is_finished: boolean;
  is_ongoing: boolean;
  not_possible_continue: boolean;
  play_game_id: number;
}

function GameHistory() {
  const { user } = useContext(AuthContext);
  const { getGameHistoryById } = useContext(GameContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [gameHistory, setGameHistory] = useState<GameHistoryData | null>(null);

  const fetchGameHistory = async () => {
    try {
      setIsLoading(true);

      const tokensJSON = localStorage.getItem('token');
      const tokens = JSON.parse(tokensJSON!);
      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`;

      const response = await getGameHistoryById(Number(id));
      setGameHistory(response);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      const error = e as AppError;
      // Tratar o erro conforme necessário
    }
  };

  useEffect(() => {
    fetchGameHistory();
  }, []);

  return (
    <>
      <HeaderLogged nickname={user!.nickname} photo={user!.photo} />
      <GameHistoryStyle>
        <TitleWrap>
          <Title>Histórico de</Title>
          <HistoryName>Nome da História</HistoryName>
        </TitleWrap>
        <GameHistoryDate>
          Iniciado em: {gameHistory ? format(parseISO(gameHistory.game_date_play), 'dd/MM/yyyy HH:mm') : 'Carregando...'}
        </GameHistoryDate>
        <CustomizedTimeline
          historic={gameHistory?.historic || []}
          is_ongoing={gameHistory?.is_ongoing || false}
          is_finished={gameHistory?.is_finished || false}
          not_possible_continue={gameHistory?.not_possible_continue || false}
        />
      </GameHistoryStyle>
    </>
  );
}

export default GameHistory;
