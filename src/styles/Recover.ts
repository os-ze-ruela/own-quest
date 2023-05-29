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
