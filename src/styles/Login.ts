import styled from "styled-components";

export const LoginStyle = styled.div`
    background-color: #282C3E;
    height: 500px ;
    width: 100%;
`

export const Wrt = styled.div`
    font-weight: bold;
    color: white;
    padding-top: 5rem;
    padding-bottom: 0em;
    font-size: 3.5rem;
    margin-left: 0.1em;
`

export const RegisterLink = styled.a`
    color: #4d92cb;
    cursor: pointer;
    text-decoration: none;
    &:hover a{
        color: white;
    }
`
export const Label = styled.label`
    margin-left: 0.5em;
    color: #FFFFFF99;
`

export const Input = styled.input`
    display: flex;
    margin-left: 0.5em;
    flex-direction: column;
    background-color: #30354B;
    margin-bottom: 1em;
    border: none;
    padding: 0.6em;
    border-radius: 0.7em;
    width: 700px;
`
export const ImgAstro = styled.img`
    position: absolute;
    width: 290px;
    height: 380px;
    margin-left: 1120px;
    margin-top: 50px;
`

export const ButtonLogin = styled.button`
    background-color: #568EA3;
    color: #FFF;
    margin-top: 0.5em;
    margin-left: 0.5em;
    padding: 0.2em 1.8em;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 0.8em;
    font-size: 1.2em;
    width: max-content;
    cursor: pointer;
`

export const Bar = styled.div`
    height: 170px ;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #202331;
`
export const BarTitle = styled.h4`
    font-size: 1.5em;
    color: white;
`
export const ButtonRegister = styled.button`
    background-color: #568EA3;
    color: #FFF;
    padding: 0.5em 1em;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 0.5em;
    font-size: 1.2em;
    width: fit-content;
    cursor: pointer;
`
export const Foot = styled.footer`
    height: 150px ;
    width: 100%;
    display: flex;
    background-color: #282C3E;
` 

