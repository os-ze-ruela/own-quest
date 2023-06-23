import styled from 'styled-components';


export const CreationBody = styled.div`
  height: 100vh;
`

export const CreationStyle = styled.div`
  background-color: #282C3E;
  width: 100%;
  height: 92%;
  
  @media screen and (max-width: 1024px) {
      height: 92%;
  }
`
export const Body = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  height: 100%;
`
export const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 900px;
  background-color: #202331;
  align-items: center;
  justify-content: space-between;
  /* padding: 20px 0; */
`

export const ActionsBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20%;
  background-color: white;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`

export const CheckBoxText = styled.p`
  font-size: 12px;
  margin: 0;
  color: black;
  font-family: FiraCode-Semibold;
`


export const ActualPage = styled.div`
  width: 100%;
  height: 1400px;
  display: flex;
  align-items: center;
  background-color: #282C3E;
`

export const Page = styled.div.attrs((props: { background: string }) => props)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.background};
  width: 60%;
  height: 90%;
  max-width: 1024px;
  max-height: 720px;
  margin: 0 auto;
  text-align: center;
  flex-direction: column;
  border-radius: 5px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 100%;
  }
`

export const PageListContainer = styled.div`
  /* width: 100%; */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background-color: white;
  padding: 0px 8px;
`;

export const PagesMenu = styled.div`
  overflow: scroll;
  overflow-y: hidden;
  display: flex;
  width: 100%;
  height: 32%;
  background-color: white;
  
  scrollbar-width: thin;
  scrollbar-color: #568EA3 #000;
  
  &:hover {
    scrollbar-color: #33819DBD #000; 
  }
  
  /* estilo da barra de rolagem para o Google Chrome */
  &::-webkit-scrollbar {
    height: 12px; /* Change the width to your desired value */
  }

  &::-webkit-scrollbar-track {
    background-color: #FFFFFF;
    height: 12px; /* Keep the same width as the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #568EA3;
    border-radius: 4px;
    height: 12px; /* Keep the same width as the scrollbar */
  }
`;

export const SideBarButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: white;
  /* padding: 10px; */
  margin: 10px;
  flex-direction:column;
  cursor: pointer;

`
export const TextButton = styled.p`
  font-size: 10pt;
  color: white;
  font-family: FiraCode-Light;
  text-align: center;

`


export const PageTitle = styled.input`
  width: 90%;
  font-size: 18pt;
  color: white;
  font-family: FiraCode-Semibold;
  text-align: center;
  background-color:transparent;
  border: 0;
  outline: none;
  outline-color: #202331;
  margin-top: 24px;

  ::placeholder{
    color: white;
    opacity: 70%;
  }

  @media screen and (max-width: 1024px) {
    margin-top: 32px;
  }

`
export const PageDescription = styled.textarea`
  width: 80%;
  height: 150px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14pt;
  color: white;
  font-family: FiraCode-Light;
  text-align: center;
  background-color: transparent;
  border: 0;
  outline: none;
  outline-color: #202331;
  resize: none;

  ::placeholder{
  color: white;
  opacity: 70%;
  }

`

export const DeleteButton = styled.button`
  
  background-color:transparent;
  border: 0;
  cursor: pointer;
`

export const ButtonContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 12px;
  column-gap: 8px;
`;

export const AddButton = styled.button.attrs((props: {canAdd: boolean}) => props)`
  display: flex;
  
  color: white;
  background-color: #202331;
  font-family: FiraCode-Light;
  border: 0;
  outline: none;
  border-radius: 5px;
  padding: 5px;
  align-items: center;
  opacity: 50%;

  &:hover {
    cursor: ${props => props.canAdd ? 'pointer' : 'not-allowed'};
  }
`;

export const EditableButton = styled.textarea.attrs((props: {isSelected: boolean, background: string, textLength:number}) => props)`
  margin-right: 10px;
   
  width: ${props => props.textLength ? `${(props.textLength + 2) * 8}px` : '20%'};
  color: white;
  height: 20px;
  background-color: ${props => props.background};
  font-family: FiraCode-Light;
  padding: 10px 8px;
  text-align: center;
  border: 0;
  outline: none;
  border-radius: 5px;
  resize: none;

  :focus{
    border-color: ${props => props.isSelected ? '#6BF0DF' : 'none'};
    border-style: ${props => props.isSelected ? 'dashed' : 'none'};
    border-width: 2px;
  }

  ::placeholder{
    color: white;
    opacity: 70%;
  }


  @media screen and (max-width: 1024px) {
    width: 350px; /* Define a largura para ocupar 90% do contêiner */
    max-width: none; /* Remove a largura máxima */
    height: auto; /* A altura se ajustará automaticamente com base no conteúdo */
    white-space: normal; /* Permite a quebra de linha */
    word-wrap: break-word;
  }
`;

export const AddPage = styled.button`
  display: flex;
  width: 75px;
  height: 50px;
  color: white;
  background-color: #568EA3;
  opacity:50%;
  border: 0;
  outline: none;
  border-radius: 5px;
  /* padding: 5px 5px 5px 5px; */
  align-items: center;
  justify-content: center;
  
  &:hover {
    cursor: pointer;
  }
`;

export const MiniPage = styled.button.attrs((props: {isLastPage: boolean, isSelected: boolean, background: string}) => props)`
  display: flex;
  
  margin-right: 10px;
  width: 75px;
  height: 50px;
  flex-direction: column;
  color: white;
  background-color: ${props => props.background};
  border-color: ${props => 
    props.isLastPage && props.isSelected ? '#9c0202' :
    props.isSelected ? '#6BF0DF' : 
    '  none'};
  border-style: ${props => props.isSelected ? 'dashed' : 'none'};
  outline: ${props => props.isLastPage ? 'auto' : 'none'};
  outline-color: ${props => props.isLastPage ? '#9c0202' : 'none'};
  border-radius: 5px;
  border-width: 3.5px;
  /* padding: 10px 0; */
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.3);

`;

export const PopupContainer = styled.div.attrs((props: {top: string, left: string}) => props)`
  display: flex;
  z-index: 50;
  flex-direction: column;
  gap: 2rem;
  position: fixed;
  top: ${props => props.top};
  left: ${props => props.left};
`;

export const ButtonSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`

// export const ButtonSettingsWrapper = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 1rem;
// `;

// export const ButtonSettings = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin: 0 auto; 
//   background: #FFFF;
//   line-height: 1.6em;  
//   border-radius: 15px;
//   width: 17%;
//   height: 3%;
//   color: 'black';
//   padding: 20px;
//   position: absolute;
//   top: 48%;

//   align-items: center;
//   justify-content: flex-start;
//   gap: 1rem;

//   &:after { /*Triangulo*/
//     content: "";
//     width: 0;
//     height: 0;
//     position: absolute;
//     border-left: 10px solid transparent;
//     border-right: 10px solid transparent;
//     /*Faz seta "apontar para baixo. Definir o valor como 'top' fará ela "apontar para cima" */
//     /*Aqui entra a cor da "aba" do balão */
//     border-top: 10px solid #FFFF;
//     bottom: -10px; /*localização. Experimente alterar para 'bottom'*/
//     right: 50%;
//     left: 50%;
//   }

// `


export const ButtonSettings = styled.div`
  display: flex;
  flex-direction: row;
  background: #FFFF;
  line-height: 1.6em;  
  border-radius: 15px;
  width: 17%;
  height: 3%; /* Altura ajustada conforme necessário */
  color: 'black';
  padding: 20px;
  position: absolute;
  /* top: 20%; */
  transform: translateY(-50%); /* Centraliza verticalmente */

  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  &:after { /* Triângulo */
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #FFFF;
    bottom: -10px;
    right: 50%;
    left: 50%;
  }


  @media screen and (max-width: 1024px) {
    width: 85%;
  }
`;
