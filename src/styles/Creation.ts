import styled from 'styled-components';


export const CreationBody= styled.div`
  height: 100vh;
`

export const CreationStyle = styled.div`
  background-color: #282C3E;
  width: 100%;
  height: 92%;
`
export const Body = styled.div`
  display: flex;
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
  height:900px;
  background-color: #202331;
  align-items: center;
  justify-content: space-between;
  /* padding: 20px 0; */
`;

export const ActionsBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 10%;
  background-color: white;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

export const CheckBoxText = styled.text`
  font-size: 12px;
  margin: 0;
  color:black;
  font-family: FiraCode-Semibold;
`;


export const ActualPage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #282C3E;
`;


export const PagesMenu = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  margin-top: 100px;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  /* padding: 10px 0; */
`;

export const PageListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;


export const Page = styled.div.attrs((props: {background: string}) => props)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.background};
  width: 60%;
  height: 100%;
  margin: 0 auto;
  margin-top: 50px;
  text-align: center;
  flex-direction: column;
  border-radius: 5px;
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
export const TextButton = styled.text`
  font-size: 10pt;
  color: white;
  font-family: FiraCode-Light;
  text-align: center;

`


export const PageTitle = styled.input`
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
export const PageDescription = styled.textarea`
  width:80%;
  height: 200px;
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
  width:100%;
  height:200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
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

export const EditableButton = styled.input`
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

export const AddPage = styled.button`
  display: flex;
  width: 75px;
  height:50px;
  color: white;
  background-color: #568EA3;
  opacity:50%;
  border: 0;
  outline: none;
  border-radius: 5px;
  /* padding: 5px 5px 5px 5px; */
  align-items: center;
  justify-content: center;
`;

export const MiniPage = styled.button.attrs((props: {isSelected: boolean, background: string}) => props)`
  display: flex;
  margin-right: 10px;
  width: 75px;
  height:50px;
  flex-direction: column;
  color: white;
  background-color: ${props => props.background};
  border-color: ${props => props.isSelected ? '#6BF0DF' : 'none'};
  border-style: ${props => props.isSelected ? 'dotted' : 'none'};
  outline: none;
  border-radius: 5px;
  /* padding: 10px 0; */
  align-items: center;
  justify-content: center;

`;
