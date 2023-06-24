import { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CreationContext } from '../../contexts/creation';
import { ActualPage, Body, ButtonGame, ButtonContainer, GameBody, GameStyle, Page, PageBody, PageDescription, PageTitle, NextButton } from '../../styles/Game';
import HeaderTestingGame from '../../components/Header/HeaderTestingGame';
import { useNavigate  } from 'react-router-dom';
import { GAME, GAME_DESCRIPTION } from '../../core/app-urls';
import { Snackbar, Alert } from '@mui/material';
import { PlayGamesContext } from '../../contexts/play-games';
import { GameContext } from '../../contexts/game';
import { AuthContext } from '../../contexts/auth';
import AppError from '../../core/app-error';



const Game = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const { getPagesFromGameID, findPageIndex } = useContext(CreationContext)
    const {currentPlayingPage, setCurrentPlayingPage, postSelectedButtonPlayingGame, historicGameId, setHistoricGameId, playGameId, finishPlayingGame} = useContext(PlayGamesContext)
    const [ buttonIndex, setButtonIndex ] = useState(-1)
    const { pages, setPages } = useContext(CreationContext)
    const { user, refresh } = useContext(AuthContext)
    const { id } = useParams()
    const [ indexPage, setIndexPage ] = useState(0)
    const { userGames, getUserGames } = useContext(GameContext);
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false)
    const [isSelect, setIsSelect] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const history = useNavigate();
    

    //Para diferenciar o teste do jogar
    const test = searchParams.get("test");

    const buttonContainerRef = useRef<HTMLDivElement | null>(null);

    const fetchGames = async () => {
      try {
        await Promise.all([getUserGames()]);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        const error = await e as AppError
        if (error.statusCode === 401) {
          try {
            await refresh()
            await fetchGames()
          } catch (e) {
          }
        }
      }
    }

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          buttonContainerRef.current &&
          !buttonContainerRef.current.contains(event.target as Node)
        ) {
          setButtonIndex(-1);
          setIsSelect(false);
        }
      };
    
      document.addEventListener('click', handleClickOutside);
    
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
    
    useEffect( () =>  {
        getPagesFromGameID(id!, true)
      }, []) 


      useEffect(() => {
        if (pages.length > 0) {
          if(currentPlayingPage != 0){
            setIndexPage(findPageIndex(pages, currentPlayingPage));
          }
          else{
            setIndexPage(0)
          }
        }
      }, [pages, currentPlayingPage]);
      

    const handleBackClick = () => {
        if(test === 'true'){
          navigate(GAME+"/"+id);
        }
        else{
          navigate(GAME_DESCRIPTION+"/"+id);
        }
      };

      const handleButton = (index: number) => {
        setButtonIndex(index);
        setIsSelect(true)
      };
      
    const handleCloseAlert = () => {
        setAlert(false)
      };
      

    const handleClickButton = async () => {

      if (pages[indexPage].isLastPage === true) {

        if(test === 'false'){
          try {
            const response =  await finishPlayingGame(playGameId)
            console.log(response)
          } catch (error) {
            console.log(error)
          }
          navigate(GAME_DESCRIPTION+"/"+id);
        }
        else{
          navigate(GAME + "/" + id);
        }

      }
  
      if (pages[indexPage].buttons[buttonIndex].nextPageId === -1) {
        setAlert(true);
      } else {
        const nextPageId = pages[indexPage].buttons[buttonIndex].nextPageId;
        const nextPageIndex = pages.findIndex((page) => page.id === nextPageId);
        setIndexPage(nextPageIndex);
        setButtonIndex(0);

        console.log('PlayGame ID = ', playGameId)
        console.log('HistoricGame ID = ', historicGameId)

        if(test === 'false'){
          try {
            const response =  await postSelectedButtonPlayingGame(
              playGameId,
              historicGameId, 
              pages[indexPage].buttons[buttonIndex].id,
              pages[indexPage].buttons[buttonIndex].title,
              pages[indexPage].buttons[buttonIndex].nextPageId
              )
            console.log(response)
            setHistoricGameId(response.data.historic_id)
          } catch (error) {
            console.log(error)
          }
      }
       
      }
    };
    

    useEffect(() => {
      console.log("Button index = ", buttonIndex)
    }, [buttonIndex])
  


  return (
    <GameBody>
      <Snackbar open={alert} autoHideDuration={4000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="warning" sx={{ backgroundColor:'#ffc341', color: 'black', width: '100%'}}>
            Botão não possui uma página de destino
          </Alert>
      </Snackbar>
      {pages.length < 1 ? (
                <></>
              ) : (
        <HeaderTestingGame pageColor={pages[indexPage].color} onBackClick={handleBackClick}/>)}
      <GameStyle>
        <Body>
          <PageBody>
            <ActualPage>
            {pages.length < 1 ? (
                <></>
              ) : (
                <Page background={pages[indexPage].color}>
                <PageTitle
                  readOnly
                  type="text"
                  name="PageTitle"
                  autoComplete="off"
                  value={pages[indexPage].title}
                />
                <PageDescription
                  readOnly
                  name="PageDescription"
                  autoComplete="off"
                  value={pages[indexPage].description}
                />
                <ButtonContainer ref={buttonContainerRef}>
                {pages[indexPage].buttons.map((button, index) => (
                    <ButtonGame
                    readOnly
                    key={index}
                    value={button.title}
                    textLength={button.title.length}
                    isSelected={isSelect}
                    background={button.color}
                    onClick={() => handleButton(index)}
                    />
                    ))}
                </ButtonContainer>
                <NextButton
                    readOnly
                    isSelect={pages[indexPage].isLastPage ? true : isSelect}
                    value={pages[indexPage].isLastPage ? "Finalizar" : "Continuar"}
                    onClick={handleClickButton}
                />
              </Page>
              )}
            </ActualPage>
          </PageBody>
        </Body>
      </GameStyle>
    </GameBody >
  );

};

export default Game;
