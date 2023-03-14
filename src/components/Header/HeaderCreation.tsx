import React from 'react';
import styled from 'styled-components';
import { FaSave } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';

interface HeaderProps {
    onBackClick: () => void;
    onCreateClick: () => void;
    isSaved: boolean;
  }
  

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #568EA3 0.03%, #6FFFE9 100.03%);
  padding: 10px;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const CreateButton = styled.button`
  background-color: white;
  color: black;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
`;

const TextHeader = styled.h1`
  font-size: 20px;
  margin: 0;
  color:white;
`;

const TextIcon = styled.h1`
  font-size: 16px;
  margin: 0;
  color: white;
`;

const SavedIcon = styled.div<{ isSaved: boolean }>`
  border-radius: 50%;
  display:flex;
  flex-direction:row;
`;
 
const HeaderCreation: React.FC<HeaderProps> = ({ onBackClick, onCreateClick, isSaved }) => {
  return (
    <HeaderContainer>
      <BackButton onClick={onBackClick}>
        <MdArrowBack color="#fff" size={20} />
      </BackButton>
      <TextHeader>Início</TextHeader>
      <SavedIcon isSaved={isSaved}>
        <FaSave size={25} color="#fff" />
        <TextIcon>Salvo</TextIcon>
      </SavedIcon>
      <TextHeader>Minha primeira história</TextHeader>
      <CreateButton onClick={onCreateClick}>Testar</CreateButton>
    </HeaderContainer>
  );
};


export default HeaderCreation;