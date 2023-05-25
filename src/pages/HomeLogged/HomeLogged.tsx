import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '../../components/Cards/Card';
import CardContinuePlayingGame from '../../components/Cards/CardContinuePlaying';
import { CardHomeShimmer } from '../../components/Cards/CardHomeShimmer';
import { CardMyGamesHomeShimmer } from '../../components/Cards/CardMyGamesHomeShimmer';
import CardUserGame from '../../components/Cards/CardUserGame';
import EmptyCard from '../../components/Cards/EmptyCard';
import Drawer from '../../components/Drawer/Drawer';
import HeaderLogged from '../../components/Header/HeaderLogged';
import EmailNotValidatedWarning from '../../components/Warning/EmailNotValidated';
import { AuthContext } from '../../contexts/auth';
import { GameContext } from '../../contexts/game';
import AppError from '../../core/app-error';
import { GAME } from '../../core/app-urls';
import { ListMyGamesCardContainer, LoggedStyle, MyGameListContainer, PageWrapper, Title } from '../../styles/HomeLogged';

const HomeLogged = () => {
  const { user, refresh, logout } = useContext(AuthContext)
  const { userGames, hotGames, userPlayingGames, getUserPlayingGames, getUserGames, getHotGamesForHome } = useContext(GameContext)
  const [isLoading, setIsLoading] = useState(true);

  const fetchGames = async () => {
    try {
      await Promise.all([getUserGames(), getHotGamesForHome(), getUserPlayingGames()]);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
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

  const { createGame } = useContext(GameContext)
  const navigate = useNavigate()

  const [sliderOffset, setSliderOffset] = useState(0);


  return (
    <>
      <Drawer />
      <HeaderLogged nickname={user!.nickname} photo={user!.photo} />
      {user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
      <LoggedStyle>
        <Title>Continuar Jogando</Title>
        <MyGameListContainer>
          <ListMyGamesCardContainer translateX={`-${sliderOffset * 80}vw`} >
            {isLoading ? (
              <>
                <CardMyGamesHomeShimmer />
                <CardMyGamesHomeShimmer />
                <CardMyGamesHomeShimmer />
                <CardMyGamesHomeShimmer />
              </>
            ) : (
              <>
                {userPlayingGames.map((playGame, index) => (
                  <CardContinuePlayingGame
                    key={index}
                    idPlayingGame={playGame.play_game_id}
                    initiatedPlay={playGame.game_date_play}
                    idGame={playGame.game.id}
                    title={playGame.game.title}
                    image={playGame.game.image}
                    description={playGame.game.description}
                  />
                ))}
              </>
            )}
          </ListMyGamesCardContainer>
          <Title>Minhas histórias</Title>
          <ListMyGamesCardContainer translateX={`-${sliderOffset * 80}vw`} >
            {isLoading ? (
              <>
                <CardMyGamesHomeShimmer />
                <CardMyGamesHomeShimmer />
                <CardMyGamesHomeShimmer />
                <CardMyGamesHomeShimmer />
              </>
            ) : userGames.length === 0 ? (
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
                    imageSrc={game.image}
                    isPublished={game.isPublished}
                    description={game.description}
                    categories={game.categories}
                  />
                ))}
              </>
            )}
          </ListMyGamesCardContainer>
          {/* {sliderOffset < 1 ? (
            <></>
          ) : (
            <MyGamesPaginationContainer direction='left'>
              <button onClick={() => {
                setSliderOffset(sliderOffset - 1);
              }}>
                <img src={nextIcon} alt="next games" className='nextIcon' />
              </button>
            </MyGamesPaginationContainer>
          )}
          <MyGamesPaginationContainer direction='right'>
            <button onClick={() => {
              setSliderOffset(sliderOffset + 1);
            }}>
              <img src={nextIcon} alt="next games" className='nextIcon' />
            </button>
          </MyGamesPaginationContainer> */}
        </MyGameListContainer>
        <Title>Histórias mais bem avaliadas</Title>
        <PageWrapper>
          {isLoading ? (
            <>
              <CardHomeShimmer />
              <CardHomeShimmer />
              <CardHomeShimmer />
              <CardHomeShimmer />
            </>
          ) :
            hotGames.map((game, index) => (
              <Card
                key={index}
                id={game.id}
                title={game.title}
                imageSrc={game.image}
                description={game.description}
                categories={game.categories}
              />
            ))}
        </PageWrapper>
      </LoggedStyle >
    </>
  );
};

export default HomeLogged;