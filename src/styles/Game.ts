import styled from 'styled-components';


export const GameBody= styled.div`
  height: 100vh;
`

export const GameStyle = styled.div`
  /* background-color: #282C3E; */
  background-color: transparent;
  width: 100%;
  /* height: 92%; */
  height: calc(100% - 8%); /* Ajusta a altura para ocupar toda a tela abaixo do header */
  
  @media screen and (max-width: 1024px) {
      height: 92%;
  }
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

export const ActualPage = styled.div`
  width: 100%;
  height: 1400px;
  display: flex;
  align-items: center;
  /* background-color: #282C3E; */
  background-color: transparent;
`;

export const Page = styled.div.attrs((props: {background: string}) => props)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.background};
  width: 100%;
  height: 100%;
  /* max-width: 1024px;
  max-height: 720px; */
  margin: 0 auto;
  text-align: center;
  flex-direction: column;
  /* border-radius: 5px; */

  @media screen and (max-width: 1024px) {
    width: 80%;
    height: 80%;
  }
`;



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
  cursor: default;

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
  cursor: default;

  ::placeholder{
  color: white;
  opacity: 70%;
  }

`


export const ButtonContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;



export const ButtonGame = styled.input.attrs((props: {isSelected: boolean, background: string, textLength:number}) => props)`
  margin-right: 10px;
  /* min-width: 30%; */
  width: ${props => props.textLength ? `${(props.textLength + 2) * 8}px` : '20%'};
  color: white; 
  background-color: ${props => props.background};
  font-family: FiraCode-Light;
  padding: 10px 0;
  text-align: center;
  border: 0;
  outline: none;
  border-radius: 5px;
  cursor: pointer;

  :focus{
    border-color: ${props => props.isSelected ? '#6BF0DF' : 'none'};
    border-style: ${props => props.isSelected ? 'dashed' : 'none'};
    border-width: 2px;
  }

`;

export const NextButton = styled.input<{ isSelect: boolean }>`
  margin-right: 10px;
  color: white; 
  background-color: #282C3E;
  font-family: FiraCode-Light;
  padding: 10px 0;
  text-align: center;
  border: 0;
  outline: none;
  border-radius: 5px;
  cursor: ${(props) => (props.isSelect ? 'pointer' : 'default')};
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.isSelect ? '1' : '0.3')};

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;


