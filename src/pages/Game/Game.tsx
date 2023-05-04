import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreationContext } from '../../contexts/creation';
import { ActualPage, Body, ButtonGame, ButtonContainer, GameBody, GameStyle, Page, PageBody, PageDescription, PageTitle, NextButton } from '../../styles/Game';
import HeaderTestingGame from '../../components/Header/HeaderTestingGame';
import { useNavigate  } from 'react-router-dom';
import { GAME } from '../../core/app-urls';


const Game = () => {
    const { getPagesFromGameID } = useContext(CreationContext)
    const [ indexPage, setIndexPage ] = useState(0)
    const [ buttonIndex, setButtonIndex ] = useState(0)
    const { pages, setPages } = useContext(CreationContext)
    const { id } = useParams()
    const navigate = useNavigate();
    
    useEffect( () =>  {
        getPagesFromGameID(id!)
      }, [])  


    const handleBackClick = () => {
        
      };
      
    const handleButton = (index: number) => {
        setButtonIndex(index) 
      };
      

    //BUG TO FIX - quando um botão é deselecionado o index ainda é mantidado e caso o botão Continuar seja pressionado será redirecionado
    const handleClickButton = () => {
      if(pages[indexPage].isLastPage === true){
        navigate(GAME+"/"+id);
      }
      else{
      const nextPageId = pages[indexPage].buttons[buttonIndex].nextPageId;
      const nextPageIndex = pages.findIndex((page) => page.id === nextPageId);
      setIndexPage(nextPageIndex);
      setButtonIndex(0);
      }
    };
      
  return (
    <GameBody>
        <HeaderTestingGame onBackClick={handleBackClick}/>
      <GameStyle>
        <Body>
          <PageBody>
            <ActualPage>
            {pages.length < 1 ? (
                <></>
              ) : (
                <Page background={pages[indexPage].color}>
                <PageTitle
                  type="text"
                  name="PageTitle"
                  autoComplete="off"
                  value={pages[indexPage].title}
                />
                <PageDescription
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
                      isSelected={index === buttonIndex}
                      background={button.color}
                      onClick={() => handleButton(index)}
                      
                    />
                  ))}
                </ButtonContainer>
                <NextButton
                    readOnly
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
