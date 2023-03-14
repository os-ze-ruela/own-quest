import React, { useState } from 'react';
import styled from 'styled-components';
import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';
import HeaderCreation from '../../components/Header/HeaderCreation';

export const CreationStyle = styled.div`
    background-color: #282C3E;
    width: 100%;
    display: flex;
    height: 700px ;
    
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  background-color: #202331;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3c3c3c;
  width:600px;
  height:500px;
  margin-left:100px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: none;
  color: black;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  svg {
    margin-right: 5px;
  }
`;



const handleBackClick = () => {
    // Lógica para voltar para a página anterior
  };

  const handleCreateClick = () => {
    // Lógica para criar o conteúdo
  };


const Creation = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <HeaderCreation onBackClick={handleBackClick} onCreateClick={handleCreateClick} isSaved={false} />
    <CreationStyle>
      <Sidebar>
        <Button onClick={() => handlePageClick(1)}>
          <FiHome />
          <span>Home</span>
        </Button>
        <Button onClick={() => handlePageClick(2)}>
          <FiUsers />
          <span>Users</span>
        </Button>
        <Button onClick={() => handlePageClick(3)}>
          <FiSettings />
          <span>Settings</span>
        </Button>
      </Sidebar>
      <Page>
        <h1>Página {currentPage}</h1>
      </Page>

    </CreationStyle>
    </>
  );
};

export default Creation;
