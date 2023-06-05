import styled from "styled-components";

export const ValidateStyle = styled.div`
    background-color: #282C3E;
    // height: 500px ;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Title = styled.h1`
    font-weight: bold;
    color: white;
    padding-top: 5rem;
    font-size: 2.5rem;
    margin-top: 1em;
    margin-left: 1em;
    margin-right: 1em;
    font-family: FiraCode-Bold;
    font-weight: 700;
    margin-bottom: 0;
    text-align: center;

    @media screen and (max-width: 1024px) {
        font-size: 2rem;
    }
`
export const SubTitle = styled.p`
    color: white;
    font-size: 1rem;
    font-family: FiraCode-Regular;
    font-weight: 300;
    opacity: 60%;

    text-align: center;
    line-height: 3em;
    margin-top: 1em;
    margin-left: 1.5em;
    margin-right: 1.5em;

    @media screen and (max-width: 1024px) {
        line-height: 2em;
    }
`

export const Label = styled.label`
    margin-left: 0.5em;
    color: #FFFFFF99;
    font-family: FiraCode-Light;
    font-weight: 300;
    padding-top: 1.2em;
    padding-right: 39rem;
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

export const ButtonSend = styled.a`
    background-color: #568EA3;
    color: #FFF;
    margin-top: 2.5em;
    margin-left: 0.5em;
    margin-bottom: 4em;
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
`
export const Bar = styled.div`
    height: 170px ;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #202331;
`
export const BarTitle = styled.h4`
    font-size: 1.5em;
    color: white;
    font-family: FiraCode-SemiBold;
    font-weight: 700;
`
