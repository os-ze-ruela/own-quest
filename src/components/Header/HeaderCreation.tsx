import React from 'react';
import styled from 'styled-components';
import { BsCloudCheck } from 'react-icons/bs';
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
  font-family: FiraCode-Semibold;
`;

const HeaderText = styled.text`
  font-size: 20px;
  margin: 0;
  color:white;
  font-family: FiraCode-Light;
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
      <HeaderText>Início</HeaderText>
      <SavedIcon isSaved={isSaved}>
        <BsCloudCheck size={30} color="#fff" />
      </SavedIcon>
      <StorieTitle       
          type="text"
          name="StorieTitle"
          value=''
          placeholder="Minha primeira história"
        >
        </StorieTitle>
      <CreateButton onClick={onCreateClick}>Testar</CreateButton>
    </HeaderContainer>
  );
};


export default HeaderCreation;