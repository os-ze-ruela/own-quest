import { Backdrop, Box, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ASTROTALKING from "../../assets/img/astronauta-conversando 1.svg";
import GPT from "../../assets/img/gpt.svg";
import CardMyGame from '../../components/Cards/CardMyGame';
import { CardMyGameShimmer } from '../../components/Cards/CardMyGameShimmer';
import EmptyCard from '../../components/Cards/EmptyCard';
import DialogRandomGame from '../../components/Dialog/DialogRandomGame';
import HeaderLogged from '../../components/Header/HeaderLogged';
import EmailNotValidatedWarning from '../../components/Warning/EmailNotValidated';
import { AuthContext } from '../../contexts/auth';
import { CategoryContext } from '../../contexts/category';
import { GameContext } from '../../contexts/game';
import { OpenAIContext } from '../../contexts/openai';
import AppError from '../../core/app-error';
import { GAME } from '../../core/app-urls';
import Game from '../../models/Game';
import { AstronautLoading, BackdropWrapper, GptIcon, LoadingText } from '../../styles/CreationSettings';
import { FilterMyGames, ListMyGamesCardContainer, MyGameWrapContainer, MyGamesStyle, RandomDescriptionButton, TitleMyGame, TitleWrapper } from '../../styles/MyGames';



const MyGames = () => {
  const { user, refresh, logout } = useContext(AuthContext)
  const { userGames, getUserGames, getHotGamesForHome } = useContext(GameContext)
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingGame, setCreatingGame] = useState(false);
  const [isLoadingGame, setIsLoadingGame] = useState(false);
  const { categories, getCategories } = useContext(CategoryContext)
  const [progress, setProgress] = useState(0);
  const { createGame } = useContext(GameContext)
  const { generateRandomGame, generateRandomGameByDescription, createRandomGame } = useContext(OpenAIContext)
  const navigate = useNavigate()
  const [progressText, setProgressText] = useState('');
  const [numPageSelected, setNumPageSelected] = useState(3)
  const [categorySelected, setCategorySelected] = useState('Aventura')
  const [description, setDescription] = useState('')
  const [selectedOption, setSelectedOption] = useState(false)

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


  const handleClickGenerateRandomStorie = async () => {
    setCreatingGame(true);
  }


  const handleGenerateRandomStorie = async () => {
    setCreatingGame(false);
    setIsLoadingGame(true);

    let randomGame = ""

    // if(selectedOption){
    //   console.log("Gerando historia pela descricao")
    randomGame = await generateRandomGameByDescription(numPageSelected, categorySelected, description)
    // }
    // else{
    //   console.log("Gerando historia parametros")
    //   randomGame = await generateRandomGame(numPageSelected, categorySelected)
    // }

    let randomGameJSON = JSON.parse(randomGame)


    const matchingCategory = categories.find(category => category.title === randomGameJSON.categories)
    let categoryIds = []

    if (matchingCategory) {
      categoryIds.push(matchingCategory.id)
      randomGameJSON.categories = categoryIds
    }

    try {
      const gameId = await createRandomGame(randomGameJSON)
      setIsLoadingGame(false);
      navigate(GAME + '/' + gameId)
    } catch (error) {
      setIsLoadingGame(false);
    }
  }



  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoadingGame) {
      const totalTime = 20000; //12s de loading
      const updateInterval = 100;
      const increment = 100 / (totalTime / updateInterval);

      timer = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prevProgress + increment;
        });

        setProgressText(getProgressText(progress));
      }, updateInterval);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isLoadingGame, progress]);


  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#75CD73' : '#ffffff',
    },
  }));

  const getProgressText = (progress: number) => {
    // Defina os textos correspondentes ao progresso
    if (progress < 25) {
      return 'Escrevendo roteiro...';
    } else if (progress < 50) {
      return 'Montando as páginas...';
    } else if (progress < 75) {
      return 'Definindo caminhos...';
    } else if (progress < 90) {
      return 'Finalizando história...';
    } else {
      return 'História Pronta';
    }
  };

  const handleCategoryChange = (categorySelected: string) => {
    setCategorySelected(categorySelected);
  };

  const handleNumPagesChange = (numberSelected: string) => {
    setNumPageSelected(Number(numberSelected));
  };

  const onCloseDialog = () => {
    setCreatingGame(false)
  };

  const [filter, setFilter] = useState('Todos');
  const [filterGames, setFilterGames] = useState<Game[]>([]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string,
  ) => {
    console.log(userGames.filter(item => item.isPublished && !item.isEditing))
    let filteredGames: Game[];
    if (newFilter === 'Editando') {
      filteredGames = userGames.filter(item => !item.isPublished && item.isEditing);
    } else {
      filteredGames = userGames.filter(item => item.isPublished);
    }
    setFilterGames(filteredGames);
    setFilter(newFilter);
  };


  return (
    <>
      <Backdrop
        sx={{ color: '#fff', background: 'rgba(0, 0, 0, 0.8)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingGame}
      >
        <BackdropWrapper>
          <AstronautLoading src={ASTROTALKING} />
          <Box sx={{
            width: '20%',
            position: 'absolute',
            top: '65%',
            zIndex: -1,
          }}>
            <BorderLinearProgress variant="determinate" value={progress} />
            <LoadingText>{progressText}</LoadingText>
          </Box>
        </BackdropWrapper>

      </Backdrop>
      <HeaderLogged nickname={user!.nickname} photo={user!.photo} />
      {user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
      <MyGamesStyle>
        <TitleWrapper>
          <TitleMyGame>Minhas histórias</TitleMyGame>
          <FilterMyGames>
            <ToggleButtonGroup
              color="primary"
              value={filter}
              exclusive
              onChange={handleChange}
              aria-label="Filter"
              style={{ fontFamily: 'FiraCode-Regular' }}
            >
              <ToggleButton
                value="Todos"
                style={{ color: '#FFFFFF', fontFamily: 'FiraCode-Regular' }}>
                Todos
              </ToggleButton>
              <ToggleButton
                value="Publicados"
                style={{ color: '#FFFFFF', fontFamily: 'FiraCode-Regular' }}>
                Publicados
              </ToggleButton>
              <ToggleButton
                value="Editando"
                style={{ color: '#FFFFFF', fontFamily: 'FiraCode-Regular' }}>
                Editando
              </ToggleButton>
            </ToggleButtonGroup>
          </FilterMyGames>
          <RandomDescriptionButton onClick={handleClickGenerateRandomStorie}>
            <p>Gerar uma história aleatória</p>
            <GptIcon src={GPT} />
          </RandomDescriptionButton>
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
            ) : filter === 'Todos' ? (
              userGames.map((game, index) => (
                <CardMyGame
                  key={index}
                  id={game.id}
                  title={game.title}
                  imageSrc={game.image}
                  isPublished={game.isPublished}
                  description={game.description}
                  categories={game.categories}
                  />
                  ))
                  ) :
              (
                filterGames.map((game, index) => (
                  <CardMyGame
                    key={index}
                    id={game.id}
                    title={game.title}
                    imageSrc={game.image}
                    isPublished={game.isPublished}
                    description={game.description}
                    categories={game.categories}
                  />
                ))
              )
            }
          </ListMyGamesCardContainer>=
        </MyGameWrapContainer>
        <Backdrop
          sx={{ color: '#fff', background: 'rgba(0, 0, 0, 0.8)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isCreatingGame}
        >
          <DialogRandomGame
            handleGenerateRandomStorie={handleGenerateRandomStorie}
            onClose={onCloseDialog}
            handleCategoryChange={handleCategoryChange}
            handleNumPagesChange={handleNumPagesChange}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            description={description}
            setDescription={setDescription}
          />
        </Backdrop>
      </MyGamesStyle >
    </>
  );
};

export default MyGames;