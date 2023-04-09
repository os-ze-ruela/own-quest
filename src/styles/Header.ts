
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