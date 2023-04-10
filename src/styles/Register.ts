import styled from "styled-components";

export const RegisterStyle = styled.div`
    background-color: #282C3E;
    height: 850px ;
    width: 100%;
    
`
export const FieldsDiv = styled.div`
    padding-left: 40px;
`

export const Title = styled.div`
    font-weight: bold;
    color: white;
    width: 50%;
    padding-top: 5rem;
    padding-bottom: 0em;
    font-size: 2.0rem;
    margin-left: 0.1em;
    font-family: FiraCode-Bold;
    font-weight: 700;
`

export const SubTitle = styled.div`
    color: white;
    font-family: FiraCode-Regular;
    font-weight: 300;
    margin-left: 0.5em;
    opacity: 60%;

`

export const LoginText = styled.p`
    color: white;
    margin-top: 30px;
    font-family: FiraCode-Regular;
    font-weight: 500;
    margin-left: 0.5em;
`
export const LoginLink = styled.a`
    color: #4d92cb;
    cursor: pointer;
    text-decoration: none;
    &:hover a{
        color: #E0E1DD;
    }
    font-family: FiraCode-Regular;
    font-weight: 500;
`
export const Label = styled.label`
    margin-left: 0.5em;
    color: #FFFFFF99;
    font-family: FiraCode-Light;
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

    @keyframes float {
            0% {
            transform: translatey(0px);
            }
            50% {
                transform: translatey(-20px);
            }
            100% {
                transform: translatey(0px);
            }
        }

    position: absolute;
    width: 380px;
    height: 380px;
    margin-left: 1000px;
    margin-top: 250px;
    animation: float 3s ease-in-out infinite;
`

export const ButtonRegister = styled.button`
     background-color: #568EA3;
    color: #FFF;
    margin-top: 0.5em;
    margin-left: 0.5em;
    padding: 0.2em 1.8em;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 8px;
    font-size: 1.2em;
    width: max-content;
    cursor: pointer;
    font-family: FiraCode-SemiBold;
    font-weight: 500;
    border-color: transparent;

    &:hover {
        box-shadow: 1px 2px 12px #FFFFFF4C;
    }

    @media screen and (max-width: 1024px) {
        font-size: 1rem;
        margin-top: 0;
    }
`