import styled from "styled-components";

export const RecoverStyle = styled.div`
    background-color: #282C3E;
    height: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 1024px) {
        padding: 0;
    }
`

export const Title = styled.div`
    font-weight: bold;
    color: white;
    padding-top: 5rem;
    padding-bottom: 0;
    font-size: 2.5rem;
    margin-left: 0.1em;
    margin-top: 1em;
    font-family: FiraCode-Bold;
    font-weight: 700;

    @media screen and (max-width: 1024px) {
        font-size: 2rem;
        margin: 0;
        padding-top: 2rem;
    }
`

export const SubTitle = styled.div`
    color: white;
    font-family: FiraCode-Regular;
    font-weight: 300;
    margin-left: 0.5em;
    opacity: 60%;

    @media screen and (max-width: 1024px) {
        margin-left: 0;
        font-size: 2rem;
    }
`

export const Label = styled.label`
    margin-left: 0.5em;
    color: #FFFFFF99;
    font-family: FiraCode-Light;
    font-weight: 300;
    padding-top: 1.2em;
    padding-right: 640px;

    @media screen and (max-width: 1024px) {
        padding-right: 0;
    }
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
    color: white;

    @media screen and (max-width: 1024px) {
        width: 70%;
        justify-self: center;
    }
`

export const ButtonRecover = styled.button`
    background-color: #568EA3;
    color: #FFF;
    margin-top: 1em;
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

    @media screen and (max-width: 1024px) {
        margin-top: 2em;
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
    position: relative;
    margin-top: 0.5em;
    margin-bottom: 0.1em;
    padding: 0.8em 1.5em;

    border: 1px solid #E0E1DD;
    border-radius: 8px;

    @media screen and (max-width: 1024px) {
        width: 80%;
    }
`
export const MessageSuccess = styled.div`
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
    background-color: #66AB4E;
    opacity: 0.8;
    font-family: FiraCode-SemiBold;
    box-sizing: border-box;

    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.8em 1.5em;

    width: 700px;
    position: relative;
    margin-top: 0.5em;
    margin-bottom: 0.1em;
    padding: 0.8em 1.5em;

    border: 1px solid #E0E1DD;
    border-radius: 8px;

    @media screen and (max-width: 1024px) {
        width: 80%;
    }
`
