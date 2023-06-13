import styled from "styled-components";


export const DialogContainer = styled.div`
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

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ButtonDialog = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #E03140;
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
    margin-top: 24px;
    
    @media screen and (max-width: 1024px) {
        font-size: 1rem;
    }
`

export const CloseButtonDialog = styled.button`
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

export const ReportInputDialog = styled.textarea`
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