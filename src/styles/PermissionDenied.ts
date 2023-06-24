import styled from "styled-components";

export const DeniedStyle = styled.div`
  background-color: #282C3E;
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    height: auto;
  }
`

export const Title = styled.div`
  font-weight: bold;
  color: white;
  padding-top: 5rem;
  padding-bottom: 0.5em;
  font-size: 2.5rem;
  margin-left: 0.1em;
  margin-top: 1em;
  font-family: FiraCode-Bold;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    padding-top: 3rem;
  }
`

export const SubTitle = styled.div`
  color: white;
  font-family: FiraCode-Regular;
  font-weight: 300;
  margin-left: 0.5em;
  opacity: 60%;
  padding-top: 0.5em;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-left: 0;
    text-align: center;
  }
`

export const ButtonSend = styled.a`
  background-color: #568EA3;
  color: #FFF;
  margin-top: 2.5em;
  margin-left: 0.5em;
  padding: 0.2em 1.8em;
  text-decoration: none;
  transition: 0.5s;
  border-radius: 0.8em;
  font-size: 1.2em;
  width: max-content;
  cursor: pointer;
  font-family: FiraCode-SemiBold;
  font-weight: 500;
  border-color: transparent;
  
  @media (max-width: 768px) {
    margin-top: 1.5em;
    font-size: 1rem;
    padding: 0.2em 1em;
  }
`

export const Bar = styled.div`
  height: 170px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #202331;
  
  @media (max-width: 768px) {
    height: 120px;
  }
`

export const BarTitle = styled.h4`
  font-size: 1.5em;
  color: white;
  font-family: FiraCode-SemiBold;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`
