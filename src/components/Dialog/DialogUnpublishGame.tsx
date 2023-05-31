import React from 'react';
import styled from 'styled-components';
import { useContext, useEffect, useRef, useState } from "react";
import { CategoryContext } from '../../contexts/category';
import AppError from '../../core/app-error';
import { api } from '../../services/api';
import { IoMdClose, IoIosOptions } from "react-icons/io";


type DialogUnpublishGameProps = {
    onClose: () => void;
    handleUnpublishGame: () => void;
  };

const DialogContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  background-color: #282C3E;
  border-radius: 15px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: FiraCode-SemiBold;
  color: white;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.5);
`;


export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2em;

`
export const Button = styled.button`
    background-color: #568EA3;
    font-weight: bold;
    font-size: 14pt;
    height: 40px;
    padding: 0 12px;
    color: #E0E1DD;
    border: transparent;
    border-radius: 8px;
    cursor: pointer;
    font-family: FiraCode-SemiBold;
    font-weight: 400;
    margin-top: 25px;
    @media screen and (max-width: 1024px) {
        font-size: 1rem;
    }

    &:hover {
        background-color: #467485;
    }

`

const CloseButton = styled.button`
    position: fixed;
    top: -5px;
    left: 98%;
    display: flex;
    align-items: center;
    background-color: #8b0505;
    font-weight: bold;
    font-size: 14pt;
    width: 30px;
    height: 30px;
    color: #E0E1DD;
    border: transparent;
    border-radius: 50px;
    cursor: pointer;
    font-family: FiraCode-Light;
    font-weight: 400;
    
    @media screen and (max-width: 1024px) {
        font-size: 1rem;
    }

    &:hover {
        background-color: #7c0505;
    }
`;



const DialogUnpublishGame: React.FC<DialogUnpublishGameProps> = ({ onClose, handleUnpublishGame}) => {
    

  const [alignment, setAlignment] = React.useState<string | null>('left');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };
  return (

    <DialogContainer>
      <CloseButton onClick={onClose}><IoMdClose size={40}/></CloseButton>
      <h2>⚠️Aviso⚠️</h2>
      <h3>Ao voltar a editar, todos membros do Own Quest que estiverem jogando sua História não poderão terminá-la e terão que recomeçar como um novo jogo. Deseja continuar mesmo assim?</h3>

      <ButtonWrapper>
        <Button onClick={handleUnpublishGame}>Entendido, voltar a editiar</Button>
      </ButtonWrapper>

    </DialogContainer>
  );
};

export default DialogUnpublishGame;
