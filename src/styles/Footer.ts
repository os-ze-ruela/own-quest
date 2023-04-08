import styled from "styled-components";


export const FooterStyle= styled.footer`
    height: 150px;
    display: flex;
    background-color: #282C3E;
    font-family: FiraCode-Regular;
    font-weight: 700;
    align-items: center;
    justify-content: space-between;
    padding: 4em;
    padding-right: 10em;
    padding-left: 10em;

    @media screen and (max-width: 1024px) {
        width: 90%;
        flex-direction: column;
        align-items: flex-start;
        padding-top: 2rem;
        padding-right: 0;
        padding-left: 3rem;
    }
` 


export const ImgStyle = styled.img`
    height: 50px ;
    width: 190px;
    align-self: center; 

    @media screen and (max-width: 1024px) {
        align-self: self-start;
    }
   
`

export const LinksDiv = styled.div`
    @media screen and (max-width: 1024px) {
        width: 90%;
    }

`

export const LinkTitle = styled.p`
    width: 100%;
    color: #E0E1DD;
    opacity: 60%;
    font-family: FiraCode-Regular;
    font-weight: 700;
`

export const LinkText = styled.p`
    color: white;
    font-family: FiraCode-Light;
    font-weight: 700;
`