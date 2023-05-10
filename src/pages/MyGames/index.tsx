import { Backdrop, CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import GPT from "../../assets/img/gpt.svg";
import CardMyGame from '../../components/Cards/CardMyGame';
import { CardMyGameShimmer } from '../../components/Cards/CardMyGameShimmer';
import EmptyCard from '../../components/Cards/EmptyCard';
import HeaderLogged from '../../components/Header/HeaderLogged';
import EmailNotValidatedWarning from '../../components/Warning/EmailNotValidated';
import { AuthContext } from '../../contexts/auth';
import { CategoryContext } from '../../contexts/category';
import { GameContext } from '../../contexts/game';
import { OpenAIContext } from '../../contexts/openai';
import AppError from '../../core/app-error';
import { GAME } from '../../core/app-urls';
import { GptIcon } from '../../styles/CreationSettings';
import { ListMyGamesCardContainer, MyGameWrapContainer, MyGamesStyle, RandomDescriptionButton, TitleMyGame, TitleWrapper } from '../../styles/MyGames';

const MyGames = () => {
  const { user, refresh, logout } = useContext(AuthContext)
  const { userGames, games, getUserGames, getHotGamesForHome } = useContext(GameContext)
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingGame, setLoadingCreatingGame] = useState(false);
  const { categories, getCategories } = useContext(CategoryContext)

  const fetchGames = async () => {
    try {
      await Promise.all([getUserGames(), getHotGamesForHome(), getCategories()]);
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
  const { generateRandomGame, createRandomGame } = useContext(OpenAIContext)
  const navigate = useNavigate()

  const [sliderOffset, setSliderOffset] = useState(0);


  const handleClickGenerateRandomStorie = async () => {
    setLoadingCreatingGame(true);
    console.log("Gerando random storie...")
    const randomGame = await generateRandomGame(3, "Aventura")

    let randomGameJSON = JSON.parse(randomGame)

    const matchingCategory = categories.find(category => category.title === randomGameJSON.categories)
    let categoryIds = []

    if (matchingCategory) {
      categoryIds.push(matchingCategory.id)
      randomGameJSON.categories = categoryIds
    }

    try {
      const gameId = await createRandomGame(randomGameJSON)
      // await getUserGames();
      setLoadingCreatingGame(false);
      navigate(GAME + '/' + gameId)
    } catch (error) {
      setLoadingCreatingGame(false);
    }
  }




  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isCreatingGame}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
          <RandomDescriptionButton onClick={handleClickGenerateRandomStorie}>Gerar uma história aleatória<GptIcon src={GPT} /></RandomDescriptionButton>

        </TitleWrapper>
        <MyGameWrapContainer>

          <ListMyGamesCardContainer  >
            {isLoading ? (
              <>
                <CardMyGameShimmer />
                <CardMyGameShimmer />
                <CardMyGameShimmer />
                <CardMyGameShimmer />
                <CardMyGameShimmer />
                <CardMyGameShimmer />
                <CardMyGameShimmer />
                <CardMyGameShimmer />
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
              userGames.map((game, index) => (
                <CardMyGame
                  key={index}
                  id={game.id}
                  title={game.title}
                  imageSrc={game.image != null ? game.image : game.image && `https://picsum.photos/300/200?random=2`}
                  isPublished={game.isPublished}
                  description={game.description}
                  categories={game.categories}
                />
              ))
            )}
          </ListMyGamesCardContainer>=
        </MyGameWrapContainer>
      </MyGamesStyle >
    </>
  );
};

export default MyGames;