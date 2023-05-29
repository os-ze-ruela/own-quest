import React, { useContext, useState, useEffect} from 'react';
import { BsCloudArrowDown, BsCloudCheck } from 'react-icons/bs';
import { MdArrowBack } from 'react-icons/md';
import styled from 'styled-components';
import { CreationContext } from '../../contexts/creation';
import { GameContext } from '../../contexts/game';
import { GAME, PLAYGAME } from '../../core/app-urls';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { CategoryContext } from '../../contexts/category';
import AppError from '../../core/app-error';
import Game from '../../models/Game';

interface HeaderProps {
    onBackClick: () => void;
    pageColor: string;
  }
  

const HeaderContainer = styled.div.attrs((props: {background: string}) => props)`
  display: flex;
  height: 8%;
  justify-content: space-between;
  align-items: center;
  /* background: linear-gradient(90deg, #568EA3 0.03%, #6FFFE9 100.03%); */
  background: ${props => props.background};
  padding: 0px 10px;
`;

const WrapItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: space-between;
  width: 100%;
`;

const StorieTitle = styled.p`
  font-size: 20px;
  margin: 0;
  /* margin-right: 250px; */
  color: white;
  font-family: FiraCode-Light;
  background-color: transparent;
  border: 0;
  outline: none;
  outline-color: #202331;
  text-align: right;
  flex-grow: 1;
  text-shadow: black 0.1em 0.1em 0.3em;
  

  ::placeholder {
    color: white;
    opacity: 70%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const BackButton = styled.a`
  background-color: transparent;
  border: none;
  cursor: pointer;
  order: -1; /* Altera a ordem para exibir antes do StorieTitle */
`;

const HeaderText = styled.p`
  font-size: 20px;
  margin: 0;
  color: white;
  font-family: FiraCode-Light;
  order: -1; /* Altera a ordem para exibir antes do StorieTitle */
  text-shadow: black 0.1em 0.1em 0.3em;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;



const HeaderTestingGame: React.FC<HeaderProps> = ({ onBackClick, pageColor }) => {

  const { loading } = useContext(CreationContext)
  const { id } = useParams()
  const { categories, getCategories } = useContext(CategoryContext)
  const { editingGame, updateGame, setEditingGame, getGameById, deleteGameByID } = useContext(GameContext)

  const fetchAllRequests = async () => {
    try {
      
      const tokensJSON = localStorage.getItem('token')
      const tokens = JSON.parse(tokensJSON!)
      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`

      await Promise.all([
        getGameById(id!),
        getCategories()
      ]);
    } catch (e) {
      const error = await e as AppError
    }
  };

  useEffect(() => {
    fetchAllRequests()
    console.log(editingGame)
  }, [])


  return (
    
    <HeaderContainer background={pageColor}>
      <WrapItems>
        <BackButton onClick={onBackClick}>
          <MdArrowBack color="#fff" size={20} />
        </BackButton>
        <HeaderText>Voltar</HeaderText>
          {editingGame ? 
          <StorieTitle>
          {editingGame!.title}
          </StorieTitle>

          :
          <StorieTitle>Teste</StorieTitle>
          }
      </WrapItems>
    </HeaderContainer>
  );
};


export default HeaderTestingGame;