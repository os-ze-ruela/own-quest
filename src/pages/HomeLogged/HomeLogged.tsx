import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../../components/Cards/Card';
import EmptyCard from '../../components/Cards/EmptyCard';
import HeaderLogged from '../../components/Header/HeaderLogged';
import { AuthContext } from '../../contexts/auth';
import { GameContext } from '../../contexts/game';
import AppError from '../../core/app-error';
import { LoggedStyle, Title } from '../../styles/HomeLogged';

const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const CardWrapper = styled.div`
  width: 48%;
  margin-bottom: 20px;
`;


const HomeLogged = () => {
  const { user, refresh, logout } = useContext(AuthContext)
  const { games, getUserGames } = useContext(GameContext)

  const fetchGames = async () => {
    try {
      await getUserGames()
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

  return (
    <>
      <HeaderLogged nickname={user.nickname} img={"https://100k-faces.glitch.me/random-image"} />
      <LoggedStyle>
        <Title>Histórias mais bem avaliadas</Title>
        <PageWrapper>
          {games.map((game, index) => (
            <CardWrapper key={index}>
              <Card
                title={game.title}
                imageSrc="https://picsum.photos/300/200?random=1"
                description={game.description}
                categories={game.categories}
              />
            </CardWrapper>
          ))}
        </PageWrapper>
        <Title>Minhas histórias</Title>
        <PageWrapper>
          <CardWrapper>
            <EmptyCard onClick={() => { }} />
          </CardWrapper>
        </PageWrapper>
      </LoggedStyle>
    </>
  );
};

export default HomeLogged;