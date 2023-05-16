
import styled from "styled-components";

// const pulseAnimation = keyframes`
//   0% {
//     transform: scale(1);
//     opacity: 1;
//   }
//   50% {
//     transform: scale(1.1);
//     opacity: 0.5;
//   }
//   100% {
//     transform: scale(1);
//     opacity: 1;
//   }
// `;

export const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding-right: 1rem;

    @media screen and (max-width: 1024px) {
        padding-right: 12px;
        gap: 1rem;
    }
`

export const HeaderStyle = styled.header`
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #282C3E;
    
`
export const LogoStyle = styled.img`
    height: 80px;
    width: 140px;
    align-self: center; 
    padding-left: 40px;

    @media screen and (max-width: 1024px) {
        height: 60px;
        width: 100px ;
        padding-left: 24px;
    }
`

export const ButtonStyle = styled.button`
    background-color: #568EA3;
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
    
    @media screen and (max-width: 1024px) {
        font-size: 1rem;
    }

`

export const LinkStyle = styled.a`
    color: #E0E1DD;
    font-size: 14pt;
    transition: all 0.3s ease-in-out 0.2s;
    font-family: FiraCode-Regular;
    font-weight: 300;
    text-decoration: none;
   

    &:hover {
        color: #b0b0b0;
        transform: scale(1.05);
        cursor: pointer;
    }

    @media screen and (max-width: 1024px) {
        display: none;
    }
`

export const PerfilLinkContainer = styled.div`
    position: relative;
`

export const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border: 2px solid #FFFFFF;
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.25);
    border-radius: 50%
`

export const UserImagePlaceholder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: #568EA3;
    border: 2px solid #FFFFFF;
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
`

export const PerfilLink = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 1rem;
    gap: 1rem;
    cursor: pointer;
    border: none;

    width: auto;
    max-width: 350px;
    height: auto;

    background: #202331;
    border-radius: 4px;

    flex: none;
    order: 1;
    flex-grow: 0;
    text-decoration: none;

    // Font

    color: #FFFFFF;
    font-size: 14pt;
    transition: all 0.3s ease-in-out 0.2s;
    font-family: FiraCode-Regular;
    font-weight: 300;
    text-decoration: none;
   
    &:hover {
        background: #202331AB;
        transform: scale(1.02);
        cursor: pointer;
    }

    @media screen and (max-width: 1024px) {
       .nickname-header {
        display: none;
       }

        background-color: #282C3E;
        padding: 0px 6px;
    }
`