import { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CreationContext } from '../../contexts/creation';
import { ActualPage, Body, ButtonGame, ButtonContainer, GameBody, GameStyle, Page, PageBody, PageDescription, PageTitle, NextButton } from '../../styles/Game';
import HeaderTestingGame from '../../components/Header/HeaderTestingGame';
import { useNavigate  } from 'react-router-dom';
import { GAME } from '../../core/app-urls';
import { Snackbar, Alert } from '@mui/material';



const Game = () => {
    const { getPagesFromGameID } = useContext(CreationContext)
    const [ indexPage, setIndexPage ] = useState(0)
    const [ buttonIndex, setButtonIndex ] = useState(0)
    const { pages, setPages } = useContext(CreationContext)
    const { id } = useParams()
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false)
    
    const searchParams = new URLSearchParams(window.location.search);

    //Para diferenciar o teste do jogar
    const test = searchParams.get("test");


    useEffect( () =>  {
        getPagesFromGameID(id!)
      }, []) 


    const handleBackClick = () => {
        
      };

      const handleButton = (index: number) => {
        if (index === buttonIndex) {
          return; // Impede a desseleção do botão
        }
        setButtonIndex(index);
      };
      
    const handleCloseAlert = () => {
        setAlert(false)
      };
      

    //BUG TO FIX - quando um botão é deselecionado o index ainda é mantidado e caso o botão Continuar seja pressionado será redirecionado
    const handleClickButton = () => {
      if (buttonIndex === -1) {
        return;
      }
  
      if (pages[indexPage].isLastPage === true) {
        navigate(GAME + "/" + id);
      }
  
      if (pages[indexPage].buttons[buttonIndex].nextPageId === -1) {
        setAlert(true);
      } else {
        const nextPageId = pages[indexPage].buttons[buttonIndex].nextPageId;
        const nextPageIndex = pages.findIndex((page) => page.id === nextPageId);
        setIndexPage(nextPageIndex);
        setButtonIndex(0);
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
                <ButtonContainer>
                {pages[indexPage].buttons.map((button, index) => (
                    <ButtonGame
                    readOnly
                    key={index}
                    value={button.title}
                    textLength={button.title.length}
                    isSelected={index === buttonIndex}
                    background={button.color}
                    onClick={() => handleButton(index)}
                    />
                    ))}
                </ButtonContainer>
                <NextButton
                    readOnly
                    value={pages[indexPage].isLastPage ? "Finalizar" : "Continuar"}
                    onClick={buttonIndex !== -1 ? handleClickButton : undefined}
                    // onClick={handleClickButton}
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
