import React from 'react';
import { EmptyButtonWrapper, EmptyCardButton, EmptyCardTitle, EmptyCardWrapper } from '../../styles/HomeLogged';
import GPT from "../../assets/img/gpt.svg";
import styled from 'styled-components';

type AddContentCardProps = {
  onClick: () => void;
};

const GptIcon = styled.img`
  width: 100px;
  height: 100px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex: 1;
  margin-top: 30px;
`;

export const CardButton = styled.button`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.6);
  opacity: 30%;
  font-family: 'FiraCode-Light';
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
        color: #b0b0b0;
        transform: scale(1.05);
        cursor: pointer;
    }
`;

export const CardTitle = styled.p`
  font-size: 20px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  margin-top: 10px;
 
`;

const CardRandomGame: React.FC<AddContentCardProps> = ({ onClick }) => {
  return (
    <EmptyCardWrapper>
      <ButtonWrapper>
        <CardButton onClick={onClick}>
          <GptIcon src={GPT} />
        </CardButton>
        <CardTitle>Gerar um história aleatória</CardTitle>
      </ButtonWrapper>
    </EmptyCardWrapper>
  );
};

export default CardRandomGame;
