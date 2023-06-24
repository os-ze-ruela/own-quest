import { Backdrop } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { HiPlus } from 'react-icons/hi';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ASTROPC from "../../assets/img/astronauta-pc.svg";
import ColorPicker from '../../components/ButtonWithColorPicker/ButtonWithColorPicker';
import HeaderCreation from '../../components/Header/HeaderCreation';
import Popup from '../../components/Popup/Popup';
import SelectBoxComponent from '../../components/SelectBoxComponent/SelectBoxComponent';
import Sidebar from '../../components/Sidebar/Sidebar';
import EmailNotValidatedWarning from '../../components/Warning/EmailNotValidated';
import { AuthContext } from '../../contexts/auth';
import { CreationContext } from '../../contexts/creation';
import { GameContext } from '../../contexts/game';
import { ActualPage, AddButton, AddPage, Body, ButtonContainer, ButtonSettings, ButtonSettingsWrapper, CreationBody, CreationStyle, DeleteButton, EditableButton, MiniPage, Page, PageBody, PageDescription, PageListContainer, PageTitle, PagesMenu, PopupContainer } from '../../styles/Creation';
import { AstronautLoading, BackdropWrapper, LoadingText } from '../../styles/CreationSettings';
import NoPagePlaceholder from './components/NoPagePlaceholder';
import PageActionBar from './components/PageActionBar';
import { Backdrop, Box } from '@mui/material';
import { AstronautLoading, BackdropWrapper, LoadingText } from '../../styles/CreationSettings';
import styled from 'styled-components';
import ASTROPC from "../../assets/img/astronauta-pc.svg";
import ColorPicker from '../../components/ButtonWithColorPicker/ButtonWithColorPicker';
import SelectBoxComponent from '../../components/SelectBoxComponent/SelectBoxComponent';
import { BiTrash } from 'react-icons/bi';
import { Button } from '../../models/Button';
import AppError from '../../core/app-error';
import { useNavigate } from "react-router-dom";

const Creation = () => {

  const { user, refresh } = useContext(AuthContext)
  const { pages, setPages } = useContext(CreationContext)
  const { indexButton, setIndexButton } = useContext(CreationContext)
  const { indexSelected, setIndexSelected } = useContext(CreationContext)
  const { handleAddButtonClick } = useContext(CreationContext)
  const { handleAddPageClick } = useContext(CreationContext)
  const { handleBackClick } = useContext(CreationContext)
  const { handleCreateClick } = useContext(CreationContext)
  const { handleTextChange } = useContext(CreationContext)
  const { actionBarSelected, setActionBarSelected } = useContext(CreationContext)
  const { getPagesFromGameID } = useContext(CreationContext)
  const { userGames, getUserGames } = useContext(GameContext)
  const { updatePage } = useContext(CreationContext)
  const { updateButton } = useContext(CreationContext)
  const { findPageIndex } = useContext(CreationContext)
  const { handleButton } = useContext(CreationContext)
  const { getGameById, editingGame, published, setPublished } = useContext(GameContext)
  const { id } = useParams()
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [showHelp, setShowHelp] = useState(true);
  // const {showButtonSettings, setShowButtonSettings} = useContext(CreationContext)
  // const [showButtonSettings, setShowButtonSettings] = useState(false);
  const { handleButtonColorChange } = useContext(CreationContext)
  const { loading, setLoading } = useContext(CreationContext)
  const { handleSelectChange } = useContext(CreationContext)
  const { handleDeleteButton } = useContext(CreationContext)
  const [showButtonSettings, setShowButtonSettings] = useState(Array(4).fill(false));
  const [buttonSettingsTop, setButtonSettingsTop] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const history = useNavigate();

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

  // useEffect(() => { 
  //   let foundMatch = false; 
  
  //   for (const game of userGames) {
  //     if (game.id.toString() === id) { 
  //       foundMatch = true; 
  //       break; 
  //     }
  //   }

  //   if (!foundMatch && userGames.length > 0) {
  //     history('/denied'); 
  //   }
    
  // }, [userGames, history]);


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


  useEffect(() => {
    getPagesFromGameID(id!, false)
    getGameById(id!)

  }, [])
  
  useEffect(() => {
    const setDocumentTitle = () => {
      if (editingGame) {
        document.title = editingGame.title;
        setPublished(editingGame.isPublished)
      }
    };

    setDocumentTitle(); // Chamada inicial para definir o título assim que o componente for montado
    // Monitora as mudanças no estado editingGame
    const editingGameUpdated = editingGame !== null && editingGame !== undefined;
    if (editingGameUpdated) {
      setDocumentTitle();
    }
  }, [editingGame]);

  const CustomBackdrop = styled(Backdrop)`
  && {
    position: fixed;
    top: 8%; /* altura do header */
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const buttonContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonContainerRef.current &&
        !buttonContainerRef.current.contains(event.target as Node)
      ) {
        setIndexButton(-1);
        setShowButtonSettings(prevState => {
          const newState = Array(4).fill(false);
          return newState;
        }
        );
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <CreationBody>
      <CustomBackdrop
        sx={{ color: '#fff', background: 'rgba(0, 0, 0, 0.95)', zIndex: (theme) => theme.zIndex.drawer + 1, width: '100%'}}
        open={published}
      >
        <BackdropWrapper>

          <AstronautLoading src={ASTROPC} />
          <LoadingText>Não é possivel editar um jogo publicado, para alterá-lo você deve acessar a página de configuração no ícone de engrenagem acima</LoadingText>
   
        </BackdropWrapper>

      </CustomBackdrop>
      {showHelp ? 
      (    
        <>    
        <PopupContainer top={'200px'} left={'20px'}>
          <Popup message="🚨 Após selecionar a página destino do botão, você pode usar o atalho F4 para ir até ela" id="popup1"/>
          <Popup message="🚨 As páginas finais ficam destacadas com uma borda vermelha" id="popup2"/>
          <Popup message="🚨 Acesse o menu lateral ◀ a direita para uma melhor visualização da história e seus caminhos" id="popup3"/>
        </PopupContainer>
        </>)
        :
        (<></>)
    }
      {user!.email_validated ? (<></>) : (<><EmailNotValidatedWarning /></>)}
      <HeaderCreation id={Number(id)} onBackClick={handleBackClick} onCreateClick={handleCreateClick} isSaved={false} set={false} isPublished={published} showHelp={showHelp} setShowHelp={setShowHelp}/>
      <CreationStyle>

        <Body>
          <PageBody>
            {pages.length > 0 ?
              (
                <PageActionBar />
              )
              :
              (<></>)
            }
            {/* <PageActionBar /> */}
            <ActualPage>
              {pages.length < 1 ? (
                <NoPagePlaceholder />
              ) : (
                <Page background={pages[indexSelected].color}
                  // onDoubleClick={() => handlePageActionBar(indexButton, actionBarSelected)}  
                //   onDoubleClick={()=>{
                //     setShowButtonSettings(prevState => {
                //     const newState = Array(pages[indexSelected].buttons.length).fill(false);
                //     return newState;
                //   }
                //   );
                // }}
                  >
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
                  <ButtonContainer ref={buttonContainerRef}>
                  {pages[indexSelected].buttons.map((button, index) => (
                  <ButtonSettingsWrapper>
                     {showButtonSettings[index]  && (
                        <ButtonSettings style={{ top: buttonSettingsTop }}>
                          <ColorPicker
                            color={pages[indexSelected].buttons[indexButton].color}
                            setColor={(color) => {
                              handleButtonColorChange(indexSelected, indexButton, color)
                              updateButton(pages[indexSelected].buttons[indexButton])
                            }} />
                           <SelectBoxComponent defaultValue="Ir para página" pageList={pages.map((page, index) => `Página ${index + 1}`)} onChange={handleSelectChange} /> 
                          <DeleteButton onClick={handleDeleteButton}>
                            <BiTrash size={30} color="#000" />
                          </DeleteButton> 
                        </ButtonSettings>
                      )} 
                    
                      <EditableButton
                        key={index}
                        id={`editable-button-${index}`}
                        value={button.title}
                        textLength={button.title.length}
                        isSelected={index === indexButton}
                        placeholder={"Botão " + (index + 1).toString()}
                        background={button.color}
                        onClick={() => {
                          setShowButtonSettings(prevState => {
                            const newState = Array(pages[indexSelected].buttons.length).fill(false);
                            newState[index] = true; // Mostra o ButtonSettings para o botão selecionado


                            // Obtenha o elemento do botão EditableButton
                            const buttonElement = document.getElementById(`editable-button-${index}`);
                            
                            if (buttonElement) {
                              // Se o elemento existir, obtenha a posição
                              const buttonRect = buttonElement.getBoundingClientRect();
                              const buttonTop = buttonRect.top;
                              console.log(buttonTop)
                              // Defina a posição top do ButtonSettings no estado
                              setButtonSettingsTop(buttonTop - 120); // Ajuste conforme necessário
                            }

                            return newState;
                          });
                          handleButton(index, button);
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
                    </ButtonSettingsWrapper>
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
                    isLastPage={page.isLastPage}
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
          <Sidebar />
        </Body>
      </CreationStyle>
    </CreationBody >
  );

};

export default Creation;
