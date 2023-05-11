import React from 'react';
import styled from 'styled-components';
import { useContext, useEffect, useRef, useState } from "react";
import { CategoryContext } from '../../contexts/category';
import AppError from '../../core/app-error';
import { api } from '../../services/api';
import SelectBoxComponent from '../SelectBoxComponent/SelectBoxComponent';
import { IoMdClose } from "react-icons/io";

type DialogRandomGameProps = {
    onClose: () => void;
    handleGenerateRandomStorie: () => void;
    handleCategoryChange: (categorySelected: string) => void;
    handleNumPagesChange: (number: string) => void
    
  };

const DialogContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
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

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;


export const Button = styled.button`
    background-color: #75CD73;
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
        background-color: #69b868;
    }

`

const CloseButton = styled.button`
    position: fixed;
    top: -5px;
    left: 95%;
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

const DialogRandomGame: React.FC<DialogRandomGameProps> = ({ handleGenerateRandomStorie, onClose, handleCategoryChange, handleNumPagesChange}) => {
  const [category, setCategory] = useState('');
  const [numPages, setNumPages] = useState(3);
  const { categories, getCategories } = useContext(CategoryContext)
    


  const handleGenerateClick = () => {
    // Lógica para gerar o jogo randomicamente
    console.log('Categoria:', category);
    console.log('Número de Páginas:', numPages);
  };

  const fetchAllRequests = async () => {
    try {
      const tokensJSON = localStorage.getItem('token')
      const tokens = JSON.parse(tokensJSON!)
      api.defaults.headers.Authorization = `Bearer ${tokens.access_token}`

      await Promise.all([
        getCategories()
      ]);
    } catch (e) {
      const error = await e as AppError
    }
  };

  useEffect(() => {
    fetchAllRequests()
  }, [])



  return (
    <DialogContainer>
      <CloseButton onClick={onClose}><IoMdClose size={40}/></CloseButton>
      <h3>Gerar Jogo Aleatório</h3>
      <h5>Defina os parâmetros do jogo a ser gerado:</h5>
      <SelectWrapper>
      <span></span>
      <SelectBoxComponent defaultValue="Categoria" pageList={categories.map((category, index) => `${category.title}`)} onChange={handleCategoryChange} />
      <span></span>
      <SelectBoxComponent defaultValue="Página" pageList={['3','4','5','6']} onChange={handleNumPagesChange} />
      <Button onClick={handleGenerateRandomStorie}>Gerar</Button>
      </SelectWrapper>
    </DialogContainer>
  );
};

export default DialogRandomGame;
