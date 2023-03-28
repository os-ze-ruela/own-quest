import React, { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { HiPlus } from 'react-icons/hi';
import HeaderCreation from '../../components/Header/HeaderCreation';
import ButtonWithColorPicker from '../../components/ButtonWithColorPicker/ButtonWithColorPicker';
import CheckBoxButton from '../../components/CheckBoxButton/CheckBoxButton';

export const CreationStyle = styled.div`
    background-color: #282C3E;
    width: 100%;

    
`
const Body = styled.div`
  display: flex;
  flex-direction: row;
`
const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  height:900px;
  background-color: #202331;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

const ActionsBar = styled.div`
  display:flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  background-color: white;
  align-items: center;
  padding: 10px 0;
  justify-content: flex-start;
  gap: 1rem;

`;

const CheckBoxText = styled.text`
  font-size: 12px;
  margin: 0;
  color:black;
  font-family: FiraCode-Semibold;
`;


const ActualPage = styled.div`
  display: flex;
  width: 100%;
  height: 650px;
  background-color: #282C3E;

`;


const PagesMenu = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: 100px;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const Page = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  background-color: #568EA3;
  width:1080px;
  height:650px;
  margin: 0 auto;
  margin-top: 50px;
  text-align: center;
  flex-direction: column;
  border-radius: 5px;
`;

const SideBarButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: white;
  padding: 10px;
  margin: 10px;
  flex-direction:column;
  cursor: pointer;

`
const TextButton = styled.text`
  font-size: 10pt;
  color: white;
  font-family: FiraCode-Light;
  text-align: center;

`


const PageTitle = styled.input`
  font-size: 18pt;
  color: white;
  font-family: FiraCode-Semibold;
  text-align: center;
  background-color:transparent;
  border: 0;
  outline: none;
  outline-color: #202331;

  ::placeholder{
  color: white;
  opacity: 70%;
  }

`
const PageDescription = styled.textarea`
  width:80%;
  height: 200px;
  display:flex;
  align-items:center;
  flex-wrap: wrap;
  font-size: 14pt;
  color: white;
  font-family: FiraCode-Light;
  text-align: center;
  background-color:transparent;
  border: 0;
  outline: none;
  outline-color: #202331;


  ::placeholder{
  color: white;
  opacity: 70%;
  }

`

const DeleteButton = styled.button`
  
  background-color:transparent;
  border: 0;
  cursor: pointer;

`

interface EditableButtonProps {
  text: string;
  onChange: (newText: string) => void;
}

const ButtonContainer = styled.div`
  width:100%;
  height:200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const AddButton = styled.button`
  display: flex;
  color: white;
  background-color: #202331;
  font-family: FiraCode-Light;
  border: 0;
  outline: none;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  align-items: center;
  opacity: 50%;
`;

const EditableButton = styled.input`
  margin-right: 10px;
  color: white;
  background-color: #202331;
  font-family: FiraCode-Light;
  border: 0;
  outline: none;
  border-radius: 5px;
  padding: 10px 0;
  text-align: center;

  ::placeholder{
  color: white;
  opacity: 70%;
  }
`;

interface EditablePagesProps {
  onChange: (newPage: string) => void;
}

const PageListContainer = styled.div`
  width:100%;
  height:50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddPage = styled.button`
  display: flex;
  width: 75px;
  height:50px;
  color: white;
  background-color: #568EA3;
  opacity:50%;
  border: 0;
  outline: none;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  align-items: center;
  justify-content: center;
`;

const MiniPage = styled.button`
  display: flex;
  margin-right: 10px;
  width: 75px;
  height:50px;
  flex-direction: column;
  color: white;
  background-color: #568EA3;
  border: 0;
  outline: none;
  border-radius: 5px;
  padding: 10px 0;
  align-items: center;
  justify-content: center;

`;



const handleBackClick = () => {
    // Lógica para voltar para a página anterior
  };

const handleCreateClick = () => {
    // Lógica para criar o conteúdo
  };


const Creation = () => {


  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  const [buttonList, setButtonList] = useState<string[]>([]);
  const [pageList, setPageList] = useState<string[]>([]);
  const [newButtonText, setNewButtonText] = useState('');
  const [newPage, setNewPage] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');

  const handleAddButtonClick = () => {
    setButtonList([...buttonList, newButtonText]);
    setNewButtonText('');
  };


  const handleAddPageClick = () => {
    setPageList([...pageList, newPage]);
    setNewPage('');
  };

  const handleTextChange = (index: number, newText: string) => {
    const updatedList = [...buttonList];
    updatedList[index] = newText;
    setButtonList(updatedList);
  };

  const handlePageTitle = (pageTitle: string) => {
    setPageTitle(pageTitle)
}
  const handlePageDescription = (pageDescription: string) => {
    setPageDescription(pageDescription)
}


  return (
    <>
    <HeaderCreation onBackClick={handleBackClick} onCreateClick={handleCreateClick} isSaved={false} />
    <CreationStyle>
      <Body>
        {/* <Sidebar>
          <SideBarButton onClick={() => handlePageClick(1)}>
            <IoMdAddCircleOutline size={30} color="#fff" />
            <TextButton>Adicionar botão</TextButton>
          </SideBarButton>
        </Sidebar> */}
        <PageBody>
          <ActionsBar>
            <ButtonWithColorPicker/>
            <CheckBoxText>Última página?</CheckBoxText>
            <CheckBoxButton checked={isChecked} onClick={handleCheckboxClick}></CheckBoxButton>
            <DeleteButton>
              <BiTrash size={30} color="#000" />
            </DeleteButton>
          </ActionsBar>
          <ActualPage>
            <Page>
                <PageTitle         
                  type="text"
                  name="PageTitle"
                  value={pageTitle}
                  placeholder="Exemplo de título"
                  onChange={(event) => handlePageTitle(event.target.value)}
                />
                <PageDescription        
                  name="PageDescription"
                  value={pageDescription}
                  placeholder="Esse é um exemplo de descrição"
                  onChange={(event) => handlePageDescription(event.target.value)}
                />
                  <ButtonContainer>
                  {buttonList.map((text, index) => (
                    <EditableButton
                    key={index}
                    value={text}
                    placeholder={"Botão "+ (index+1).toString()}
                    onChange={(event) => handleTextChange(index, event.target.value)}
                    />
                    ))}
                  <AddButton onClick={handleAddButtonClick}>
                    <MdOutlineAddCircleOutline size={25} color="#fff" />
                  </AddButton>
                </ButtonContainer>
            </Page>
          </ActualPage>
          <PagesMenu>
            <PageListContainer>
                    {pageList.map((text, index) => (
                      <MiniPage
                      key={index}
                      value={text}
                      >
                      <span>{index+1}</span> 
                      </MiniPage>
                      ))}
                    <AddPage onClick={handleAddPageClick}>
                      <HiPlus size={25} color="#000" />
                    </AddPage>
              </PageListContainer>
          </PagesMenu>
        </PageBody>
      </Body>
    </CreationStyle>
    </>
  );
};

export default Creation;
