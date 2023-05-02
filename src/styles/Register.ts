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
    flex-direction: column;
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
    background-color: #30354B;
    margin-bottom: 1em;
    border: none;
    padding: 0.6em;
    border-radius: 0.7em;
    width: 700px;
    width: 100%
    height: 25px;
    font-family: FiraCode-Regular;
    color: white;

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

export const MessageError = styled.div`
    @keyframes shake {
        0% {
        transform: translate(0);
        }
        20% {
        transform: translate(-10px, 0);
        }
        40% {
        transform: translate(10px, 0);
        }
        60% {
        transform: translate(-10px, 0);
        }
        80% {
        transform: translate(10px, 0);
        }
        100% {
        transform: translate(0);
        }
    }

    animation-name: shake;
    animation-duration: 0.5s;
    animation-iteration-count: 1;

    color: white;
    background-color: #E03140;
    opacity: 0.8;
    font-family: FiraCode-SemiBold;
    box-sizing: border-box;

    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.8em 1.5em;

    width: 700px;
    position: absolute
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: 0.5em;
    padding: 0.8em 1.5em;

    border: 1px solid #E0E1DD;
    border-radius: 8px;

    @media screen and (max-width: 1024px) {
        width: 80%;
    }
`