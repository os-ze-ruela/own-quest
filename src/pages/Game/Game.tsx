import { useContext, useEffect } from 'react';
import { HiPlus } from 'react-icons/hi';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import HeaderCreation from '../../components/Header/HeaderCreation';
import { CreationContext } from '../../contexts/creation';
import { GameContext } from '../../contexts/game';
import { ActualPage, Body, ButtonContainer, EditableButton, GameBody, GameStyle, Page, PageBody, PageDescription, PageTitle } from '../../styles/Game';

const Game = () => {
  const { pages, setPages } = useContext(CreationContext)
  const { indexButton, setIndexButton } = useContext(CreationContext)
  const { indexSelected, setIndexSelected } = useContext(CreationContext)
  const { getPagesFromGameID } = useContext(CreationContext)
  const { findPageIndex } = useContext(CreationContext)
  const { destinyPage, setDestinyPage} = useContext(CreationContext)
  const { handleButton } = useContext(CreationContext)
  const { getGameById } = useContext(GameContext)

  const { id } = useParams()

  useEffect(() => {
    getPagesFromGameID(id!)
    getGameById(id!)
  }, [])

  useEffect(() => {
    console.log("index button = "+indexButton)
  }, [indexButton])



  return (
    <GameBody>
      <GameStyle>
        <Body>
          <PageBody>
            <ActualPage>
                <Page background={pages[indexSelected].color} >
                <PageTitle
                  type="text"
                  name="PageTitle"
                  autoComplete="off"
                  value={pages[indexSelected].title}
                />
                <PageDescription
                  name="PageDescription"
                  autoComplete="off"
                  value={pages[indexSelected].description}
                />
                <ButtonContainer>
                  {pages[indexSelected].buttons.map((button, index) => (
                    <EditableButton
                      key={index}
                      value={button.title}
                      isSelected={index === indexButton}
                      placeholder={"Botão " + (index + 1).toString()}
                      background={button.color}
                    />
                  ))}
                </ButtonContainer>
              </Page>
            </ActualPage>
          </PageBody>
        </Body>
      </GameStyle>
    </GameBody >
  );

};

export default Game;
