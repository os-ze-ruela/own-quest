import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import GPT from "../../assets/img/gpt.svg";
import CardMyGame from '../../components/Cards/CardMyGame';
import EmptyCard from '../../components/Cards/EmptyCard';
import HeaderLogged from '../../components/Header/HeaderLogged';
import EmailNotValidatedWarning from '../../components/Warning/EmailNotValidated';
import { AuthContext } from '../../contexts/auth';
import { GameContext } from '../../contexts/game';
import AppError from '../../core/app-error';
import { GAME } from '../../core/app-urls';
import { GptIcon } from '../../styles/CreationSettings';
import { ListMyGamesCardContainer, MyGameWrapContainer, MyGamesStyle, RandomDescriptionButton, TitleMyGame, TitleWrapper } from '../../styles/MyGames';

const MyGames = () => {
  const { user, refresh, logout } = useContext(AuthContext)
  const { userGames, games, getUserGames, getHotGamesForHome } = useContext(GameContext)
  const [isLoading, setIsLoading] = useState(true);

  const fetchGames = async () => {
    try {
      await Promise.all([getUserGames(), getHotGamesForHome()]);
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

  const randomInt = (): number => {
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
    return rand;
  }

  const { createGame } = useContext(GameContext)
  const navigate = useNavigate()

  const [sliderOffset, setSliderOffset] = useState(0);


  const ListGamesContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    gap: 2rem;
    padding: 0px 2rem;
    `;


  return (
    <>
      <HeaderLogged nickname={user!.nickname} photo={user!.photo} />
      {user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
      <MyGamesStyle>
        {/* <Title>Crie uma nova história</Title>
        <GameListContainer>
            <ListGamesContainer>
                <EmptyCard onClick={async () => {
                        try {
                        const id = await createGame();
                        navigate(GAME + '/' + id)
                        } catch (e) {
                        const error = await e as AppError;
                        alert(error)
                        }
                }} />
                <CardRandomGame onClick={()=>{}}></CardRandomGame>
                </ListGamesContainer>
        </GameListContainer> */}
        <TitleWrapper>
          <TitleMyGame>Minhas histórias</TitleMyGame>
          <RandomDescriptionButton onClick={() => {}}>Gerar uma história aleatória<GptIcon src={GPT} /></RandomDescriptionButton>

        </TitleWrapper>
        <MyGameWrapContainer>

          <ListMyGamesCardContainer  >
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
                  <CardMyGame
                    key={index}
                    id={game.id}
                    title={game.title}
                    imageSrc={game.image != null ? game.image :game.image && `https://picsum.photos/300/200?random=2`}
                    isPublished={game.isPublished}
                    description={game.description}
                    categories={game.categories}
                  />
                ))}
              </>
            )}
          </ListMyGamesCardContainer>=
        </MyGameWrapContainer>
      </MyGamesStyle >
    </>
  );
};

export default MyGames;