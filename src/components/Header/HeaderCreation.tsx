import React, { useContext, useState, useEffect } from 'react';
import { BsCloudArrowDown, BsCloudCheck } from 'react-icons/bs';
import { MdArrowBack } from 'react-icons/md';
import styled from 'styled-components';
import { CreationContext } from '../../contexts/creation';
import { GameContext } from '../../contexts/game';
import { PLAYGAME } from '../../core/app-urls';

interface HeaderProps {
    id: number;
    onBackClick: () => void;
    onCreateClick: () => void;
    isSaved: boolean;
  }
  

const HeaderContainer = styled.div`
  display: flex;
  height: 8%;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #568EA3 0.03%, #6FFFE9 100.03%);
  padding: 0px 10px;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const CreateButton = styled.a`
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
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
  gap: 2rem;

  @media screen and (max-width: 1024px) {
      gap: 1rem;
  }
`

 
const HeaderCreation: React.FC<HeaderProps> = ({ id, onBackClick, onCreateClick, isSaved }) => {

  const { loading } = useContext(CreationContext)
  const { editingGame, updateGame, setEditingGame,  } = useContext(GameContext)
  const [titleTemp, setTitleTemp] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTemp(event.target.value);
  };
  
  useEffect(() => {
    if (editingGame) {
      setTitleTemp(editingGame.title);
    }
  }, [editingGame]);

  useEffect(() => {
    console.log(editingGame)
    if (editingGame && titleTemp !== editingGame.title && (titleTemp.length > 0)) {
      console.log("Entrou")
      const newEditingGame = {...editingGame, title: titleTemp};
      setEditingGame(newEditingGame);
      updateGame(newEditingGame);
    }
  }, [titleTemp])


  return (
    
    <HeaderContainer>
      <WrapItems>
        <BackButton onClick={onBackClick}>
          <MdArrowBack color="#fff" size={20} />
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
        <CreateButton href={PLAYGAME + '/' + id} onClick={onCreateClick}>Testar</CreateButton>
      </WrapItems>
    </HeaderContainer>
  );
};


export default HeaderCreation;