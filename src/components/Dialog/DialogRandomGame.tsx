import React, { useContext, useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import styled from 'styled-components';
import { AuthContext } from '../../contexts/auth';
import { CategoryContext } from '../../contexts/category';
import AppError from '../../core/app-error';
import SelectBoxComponent from '../SelectBoxComponent/SelectBoxComponent';


type DialogRandomGameProps = {
  onClose: () => void;
  handleGenerateRandomStorie: () => void;
  handleCategoryChange: (categorySelected: string) => void;
  handleNumPagesChange: (number: string) => void;
  selectedOption: boolean;
  setSelectedOption: (option: boolean) => void;
  description: string;
  setDescription: (category: string) => void;
};

const DialogContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: #282C3E;
  border-radius: 15px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: FiraCode-SemiBold;
  color: white;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.5);
  text-align: center;

  @media screen and (max-width: 768px) {
    width: 80%;
  }

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
        width: 60%;
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

export const DescriptionInput = styled.textarea`
    background-color: #30354B;
    text-align: justify;
    white-space: pre-line;
    color: white;
    width: 100%; 
    height: 200px;
    border-radius: 0.7em;
    border: none;
    margin-bottom: 0.7em;
    padding-top: 12px;
    padding-left: 8px;
    padding-bottom: 1em;
    padding-right: 12px;
    font-family: FiraCode-light;
    font-weight: 400;
    font-size: 15px;
    resize: none;
    outline: none;  
    margin: 8px 0px;
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;
    font-family: 'FiraCode-Light';

    ::placeholder{
        color: #ffffff94;
        
    }
    
    
`


const DialogRandomGame: React.FC<DialogRandomGameProps> = ({ handleGenerateRandomStorie, onClose, handleCategoryChange, handleNumPagesChange, selectedOption, setSelectedOption, description, setDescription }) => {
  const [category, setCategory] = useState('');
  // const [description, setDescription] = useState('');
  const [numPages, setNumPages] = useState(3);
  const { categories, getCategories } = useContext(CategoryContext)
  const { user } = useContext(AuthContext)
  // const [selected, setSelected] = useState(false);

  const fetchAllRequests = async () => {
    try {
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



  const [alignment, setAlignment] = React.useState<string | null>('left');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };
  return (

    <DialogContainer>
      <CloseButton onClick={onClose}><IoMdClose size={40} /></CloseButton>
      <h3>Gerar Jogo Aleatório</h3>
      <DescriptionInput
        name="StoryDescription"
        autoComplete="off"
        value={description}
        placeholder="Descreva brevemente a história que deseja gerar"
        onChange={(event) => { setDescription(event.target.value) }}
      />
      <>
        <h5>Escolha uma categoria para história:</h5>
        <SelectBoxComponent defaultValue="Categoria" pageList={categories.map((category, index) => `${category.title}`)} onChange={handleCategoryChange} />
      </>
      <h5>Selecione o número de páginas da história:</h5>
      <SelectBoxComponent
        defaultValue="Páginas"
        pageList={
          user!.is_premium ?
            ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']
            : ['3', '4', '5', '6', '7', '8', '9', '10']
        }
        onChange={handleNumPagesChange}
      />
      <Button onClick={handleGenerateRandomStorie}>Gerar</Button>
      {/* </SelectWrapper> */}
    </DialogContainer>
  );
};

export default DialogRandomGame;
