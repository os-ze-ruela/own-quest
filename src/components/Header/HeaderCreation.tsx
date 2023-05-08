import React, { useContext, useEffect, useState } from 'react';
import { BsCloudArrowDown, BsCloudCheck } from 'react-icons/bs';
import { MdArrowBack } from 'react-icons/md';
import { RiSettings5Fill } from 'react-icons/ri';
import styled from 'styled-components';
import { CreationContext } from '../../contexts/creation';
import { GameContext } from '../../contexts/game';
import { GAME, HOME, PLAYGAME, SETTINGS } from '../../core/app-urls';

interface HeaderProps {
    id: number;
    onBackClick: () => void;
    onCreateClick: () => void;
    isSaved: boolean;
    set: boolean;
  }
  

const HeaderContainer = styled.div`
  display: flex;
  height: 8%;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #568EA3 0.03%, #6FFFE9 100.03%);
  padding: 0px 10px;
`;

const HeaderContainer2 = styled.div`
  display: flex;
  height: 8%;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #568EA3 0.03%, #6FFFE9 100.03%);
  padding: 14px 10px;
`;

const BackButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
`;

const CreateButton = styled.a`
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  font-family: FiraCode-Semibold;
`;

const HeaderText = styled.p`
  font-size: 20px;
  margin: 0;
  color:white;
  font-family: FiraCode-Light;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const StorieTitle = styled.input`
  font-size: 20px;
  margin: 0;
  color:white;
  font-family: FiraCode-Light;
  background-color:transparent;
  border: 0;
  outline: none;
  outline-color: #202331;

  ::placeholder{
    color: white;
    opacity: 70%;
  }

  @media screen and (max-width: 1024px) {
      display: none;
  }

`;

const SavedIcon = styled.div<{ isSaved: boolean }>`
  border-radius: 50%;
  display:flex;
  flex-direction:row;

  @media screen and (max-width: 1024px) {
      margin-left: 12px;
  }
`;

const WrapItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media screen and (max-width: 1024px) {
      gap: 1rem;
  }
`
const SettingIcon = styled.a`
  color: white;
  font-size: 28px;
  .hovered {
    transform: scale(1.2) rotate(35deg);
    transition: transform 0.3s ease-in-out;
  }
`

 
const HeaderCreation: React.FC<HeaderProps> = ({ id, onBackClick, onCreateClick, isSaved, set }) => {

  const { loading , setLoading} = useContext(CreationContext)
  const { editingGame, updateGame, setEditingGame,  } = useContext(GameContext)
  const [titleTemp, setTitleTemp] = useState('');
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const { pages, setPages } = useContext(CreationContext)
  const { deleteGameByID } = useContext(GameContext)

  const debounceSaveChanges = () => {
    setLoading(true)
    if (timerId) {
      clearTimeout(timerId);
    }
    const idTimer = setTimeout(() => {
      saveChanges();
    }, 1000);
    setTimerId(idTimer);
  };
  
  const saveChanges = () => {
    setLoading(false);
    updateGame(editingGame!);
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTemp(event.target.value);
  };

  
  useEffect(() => {
    if (editingGame) {
      setTitleTemp(editingGame.title);
    }
  }, [editingGame]);

  // Debounce no titulo causando erros
  useEffect(() => {
    console.log(editingGame)
    if (editingGame && titleTemp !== editingGame.title && (titleTemp.length > 0)) {
      const newEditingGame = {...editingGame, title: titleTemp};
      setEditingGame(newEditingGame);
      updateGame(newEditingGame);
      // debounceSaveChanges()
    }
  }, [titleTemp])

  //Tratamento para historia criada vazia, sem paginas e sem titulo
  const handleBack = () => {
    if (editingGame) {
      if(pages.length === 0 && editingGame.title === "Nova história"){
        console.log("apagando jogo")
        deleteGameByID(editingGame.id)
      }
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  
  const handleHover = () => {
    setIsHovered(!isHovered);
  }


  return (
    <>
    {!set ?
      <HeaderContainer>
        <WrapItems>
          <BackButton href={HOME} onClick={handleBack}>
            <MdArrowBack color="#fff" size={24} />
          </BackButton>
          <HeaderText>Voltar</HeaderText>
          <SavedIcon isSaved={isSaved}>
            {loading ? (
              <BsCloudArrowDown size={30} color="#fff" />
              ):(
                <BsCloudCheck size={30} color="#fff" />
                )}
          </SavedIcon>
        </WrapItems>
        <WrapItems>
          <StorieTitle       
              type="text"
              name="StorieTitle"
              autoComplete="off"
              value={titleTemp!}
              placeholder="Minha primeira história"
              onChange={handleChange}
              >
            </StorieTitle>
            <SettingIcon href={GAME + '/' + id + SETTINGS} onMouseEnter={handleHover} onMouseLeave={handleHover}>
              <RiSettings5Fill className={isHovered ? 'hovered' : ''} />
            </SettingIcon>
          <CreateButton href={PLAYGAME + '/' + id + '?test=true'} onClick={onCreateClick}>Testar</CreateButton>
        </WrapItems>
      </HeaderContainer>
      :
      <HeaderContainer2>
        <WrapItems>
          <BackButton href={GAME + '/' + id} onClick={handleBack}>
            <MdArrowBack color="#fff" size={24} />
          </BackButton>
          <HeaderText>Voltar</HeaderText>
        </WrapItems>
        <WrapItems>
          <StorieTitle       
              type="text"
              name="StorieTitle"
              autoComplete="off"
              value={titleTemp!}
              placeholder="Minha primeira história"
              onChange={handleChange}
              >
            </StorieTitle>
        </WrapItems>
      </HeaderContainer2>
      }
    </>
  );
};


export default HeaderCreation;