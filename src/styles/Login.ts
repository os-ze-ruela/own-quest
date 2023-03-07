import styled from "styled-components";

export const LoginStyle = styled.div`
    background-color: #282C3E;
    height: 500px ;
    width: 100%;
    
`

export const FieldsDiv = styled.div`
    padding-left: 40px;
`

export const Title = styled.div`
    font-weight: bold;
    color: white;
    padding-top: 5rem;
    padding-bottom: 0em;
    font-size: 3.5rem;
    margin-left: 0.1em;
    font-family: FiraCode;
    font-weight: 700;
`

export const SubTitle = styled.div`
    color: white;
    font-family: FiraCode;
    font-weight: 300;
    margin-left: 0.5em;
    opacity: 60%;

`

export const RegisterText = styled.p`
    color: white;
    margin-top: 30px;
    font-family: FiraCode;
    font-weight: 500;
    margin-left: 0.5em;
`
export const RegisterLink = styled.a`
    color: #4d92cb;
    cursor: pointer;
    text-decoration: none;
    &:hover a{
        color: #E0E1DD;
    }
    font-family: FiraCode;
    font-weight: 500;
`
export const Label = styled.label`
    margin-left: 0.5em;
    color: #FFFFFF99;
    font-family: FiraCode;
    font-weight: 300;
`

export const InputButtonDiv = styled.div`
    position: relative;
    width: 700px;
`
export const HideButton = styled.img`
    position: absolute;
    right: 2px;
    top: 50%;
    transform: translateY(-50%);
    width:35px;
    height:35px;
    /* padding-left: 670px; */
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
    height: 25px;

`
export const ImgAstro = styled.img`

    @keyframes animation {
        0% {
            transform: translateY(-40px);
        }
        25% {
            transform: translateY(80px);
        }
        75% {
            transform: translateY(-80px);
        }
        100% {
            transform: translateY(40px);
        }
    }

    position: absolute;
    width: 290px;
    height: 380px;
    margin-left: 1120px;
    margin-top: 50px;
    animation: animation  3s infinite;
    
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
    font-family: FiraCode;
    font-weight: 500;
    border-color: transparent;
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
    font-family: FiraCode;
    font-weight: 700;
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
    font-family: FiraCode;
    font-weight: 400;
    border-color: transparent;
`

