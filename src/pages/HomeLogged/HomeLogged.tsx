import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '../../components/Cards/Card';
import CardUserGame from '../../components/Cards/CardUserGame';
import EmptyCard from '../../components/Cards/EmptyCard';
import HeaderLogged from '../../components/Header/HeaderLogged';
import EmailNotValidatedWarning from '../../components/Warning/EmailNotValidated';
import { AuthContext } from '../../contexts/auth';
import { GameContext } from '../../contexts/game';
import AppError from '../../core/app-error';
import { GAME } from '../../core/app-urls';
import { LoggedStyle, PageUserGameWrapper, PageWrapper, Title } from '../../styles/HomeLogged';

const HomeLogged = () => {
  const { user, refresh, logout } = useContext(AuthContext)
  const { userGames, games, getUserGames, getHotGamesForHome } = useContext(GameContext)

  const fetchGames = async () => {
    try {
      await Promise.all([getUserGames(), getHotGamesForHome()]);
    } catch (e) {
      const error = await e as AppError
      if (error.statusCode === 401) {
        try {
          await refresh()
          await fetchGames()
        } catch (e) {
          logout()
        }
      }
    }
  };

  useEffect(() => {
    fetchGames()

  }, [])

  const randomInt = (): number => {
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
    return rand;
  }

  const { createGame } = useContext(GameContext)
  const navigate = useNavigate()


  return (
    <>
      <HeaderLogged nickname={user!.nickname} photo={user!.photo} />
      {user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
      <LoggedStyle>
        <Title>Histórias mais bem avaliadas</Title>
        <PageWrapper>
          {games.map((game, index) => (
            <Card
              key={index}
              title={game.title}
              imageSrc={`https://picsum.photos/300/200?random=${randomInt()}`}
              description={game.description}
              categories={game.categories}
            />
          ))}
        </PageWrapper>
        <Title>Minhas histórias</Title>
        <PageUserGameWrapper>
          {userGames.length === 0 ? (
            <EmptyCard onClick={async () => {
              try {
                const id = await createGame();
                navigate(GAME + '/' + id)
              } catch (e) {
                const error = await e as AppError;
                alert(error)
              }
            }} />
          ) : (
            <>
              {userGames.map((game, index) => (
                <CardUserGame
                  key={index}
                  id={game.id}
                  title={game.title}
                  imageSrc={`https://picsum.photos/300/200?random=${randomInt()}`}
                  isPublished={game.isPublished}
                  description={game.description}
                  categories={game.categories}
                />
              ))}
            </>
          )}
        </PageUserGameWrapper>
      </LoggedStyle>
    </>
  );
};

export default HomeLogged;