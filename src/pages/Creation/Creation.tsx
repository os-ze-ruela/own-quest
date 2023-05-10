import { useContext, useEffect, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import HeaderCreation from '../../components/Header/HeaderCreation';
import Popup from '../../components/Popup/Popup';
import Sidebar from '../../components/Sidebar/Sidebar';
import EmailNotValidatedWarning from '../../components/Warning/EmailNotValidated';
import { AuthContext } from '../../contexts/auth';
import { CreationContext } from '../../contexts/creation';
import { GameContext } from '../../contexts/game';
import { ActualPage, AddButton, AddPage, Body, ButtonContainer, CreationBody, CreationStyle, EditableButton, MiniPage, Page, PageBody, PageDescription, PageListContainer, PageTitle, PagesMenu, PopupContainer } from '../../styles/Creation';
import ButtonActionBar from './components/ButtonActionBar';
import NoPagePlaceholder from './components/NoPagePlaceholder';
import PageActionBar from './components/PageActionBar';




const Creation = () => {
  
  const { user } = useContext(AuthContext)
  const { pages, setPages } = useContext(CreationContext)
  const { indexButton, setIndexButton } = useContext(CreationContext)
  const { indexSelected, setIndexSelected } = useContext(CreationContext)
  const { handleAddButtonClick } = useContext(CreationContext)
  const { handleAddPageClick } = useContext(CreationContext)
  const { handleCheckboxClick } = useContext(CreationContext)
  const { handleBackClick } = useContext(CreationContext)
  const { handleCreateClick } = useContext(CreationContext)
  const { handleTextChange } = useContext(CreationContext)
  const { handleButtonActionBar } = useContext(CreationContext)
  const { handlePageActionBar } = useContext(CreationContext)
  const { actionBarSelected, setActionBarSelected } = useContext(CreationContext)
  const { getPagesFromGameID } = useContext(CreationContext)
  const { updatePage } = useContext(CreationContext)
  const { updateButton } = useContext(CreationContext)
  const { findPageIndex } = useContext(CreationContext)
  const { destinyPage, setDestinyPage} = useContext(CreationContext)
  const { handleButton } = useContext(CreationContext)
  const { getGameById } = useContext(GameContext)
  const { id } = useParams()
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const {loading, setLoading} = useContext(CreationContext)


  const debounceSaveChanges = () => {
    setLoading(true)
    if (timerId) {
      clearTimeout(timerId);
    }
    const idTimer = setTimeout(() => {
      saveChanges();
    }, 500);
    setTimerId(idTimer);
  };
  
  const saveChanges = () => {
    setLoading(false);
    updatePage(pages[indexSelected])
  };

  const debounceSaveChangesButton = () => {
    setLoading(true)
    if (timerId) {
      clearTimeout(timerId);
    }
    const idTimer = setTimeout(() => {
      saveChangesButton();
    }, 500);
    setTimerId(idTimer);
  };
  
  const saveChangesButton = () => {
    setLoading(false);
    updateButton(pages[indexSelected].buttons[indexButton])
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  
  useEffect( () =>  {
    getPagesFromGameID(id!)
    getGameById(id!)
  }, [])  
  
  
  return (
    <CreationBody>
      <PopupContainer top={'200px'} left={'20px'}>
        <Popup message="🚨 Após selecionar um botão, clique duas vezes na página para voltar a edita-lá" />
        <Popup message="🚨 Após selecionar a página destino do botão, você pode usar o atalho F4 para ir até ela" />
      </PopupContainer>
      <PopupContainer top={'700px'} left={'1200px'}>
        <Popup message="🚨 As páginas finais ficam destacadas com uma borda vermelha" />
      </PopupContainer>
      {user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
      <HeaderCreation id={Number(id)} onBackClick={handleBackClick} onCreateClick={handleCreateClick} isSaved={false} set={false}/>
      <CreationStyle>
        <Body>
          <PageBody>
            { pages.length > 0 ? actionBarSelected ?
              (
                <PageActionBar />
              )
              :
              (
                <ButtonActionBar />
              ) : (<></>)
            }

            <ActualPage>
              {pages.length < 1 ? (
                <NoPagePlaceholder />
              ) : (<Page background={pages[indexSelected].color}
                onDoubleClick={() => handlePageActionBar(indexButton, actionBarSelected)}   >
                <PageTitle
                  type="text"
                  name="PageTitle"
                  autoComplete="off"
                  value={pages[indexSelected].title}
                  placeholder="Exemplo de título"
                  onChange={(event) => {
                    let pagesTemp = [...pages];
                    pagesTemp[indexSelected].title = event.target.value;
                    setPages(pagesTemp);
                    // updatePage(pages[indexSelected])
                    debounceSaveChanges()
                  }}
                />
                <PageDescription
                  name="PageDescription"
                  autoComplete="off"
                  value={pages[indexSelected].description}
                  placeholder="Esse é um exemplo de descrição"
                  onChange={(event) => {
                    let pagesTemp = [...pages];
                    pagesTemp[indexSelected].description = event.target.value;
                    setPages(pagesTemp);
                    // updatePage(pages[indexSelected])
                    debounceSaveChanges()
                  }}
                />
                <ButtonContainer>
                  {pages[indexSelected].buttons.map((button, index) => (
                    <EditableButton
                      key={index}
                      value={button.title}
                      isSelected={index === indexButton}
                      placeholder={"Botão " + (index + 1).toString()}
                      background={button.color}
                      onClick={()=>{
                        handleButton(index, button)
                      }}
                      onChange={(event) => {
                        handleTextChange(indexSelected, index, event.target.value);
                        // updateButton(button)
                        debounceSaveChangesButton()
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "F4" && button.nextPageId !== -1) {
                          setActionBarSelected(true)
                          setIndexSelected(findPageIndex(pages, button.nextPageId))
                        }
                      }}
                    />
                  ))}
                  <AddButton onClick={
                    () => { handleAddButtonClick(indexSelected); }}
                    canAdd={pages[indexSelected].buttons.length < 4} >
                    <MdOutlineAddCircleOutline size={25} color="#fff" />
                  </AddButton>
                </ButtonContainer>
              </Page>)}

            </ActualPage>
            <PagesMenu>
              <PageListContainer>
                {pages.map((page, index) => (
                  <MiniPage
                    isLastPage = {page.isLastPage}
                    isSelected={index === indexSelected}
                    background={page.color}
                    key={index}
                    value={index}
                    onClick={() => {
                      setActionBarSelected(true)
                      setIndexSelected(index)
                    }}
                  >
                    <span>{index + 1}</span>
                  </MiniPage>
                ))}
                <AddPage onClick={() => { handleAddPageClick(id!) }}>
                  <HiPlus size={25} color="#000" />
                </AddPage>
              </PageListContainer>
            </PagesMenu>
          </PageBody>
          <Sidebar/>
        </Body>
      </CreationStyle>
    </CreationBody >
  );

};

export default Creation;
