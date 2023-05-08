import styled from 'styled-components';

export const GameInfosMain = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;
    padding: 0px 2rem;
`

export const BackButtonWrapper = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF62;
    font-size: 14px;
    gap: 1rem;
    text-decoration: none;
    
    &:hover {
        cursor: pointer;
        color: #FFFFFFA4;
    }
`

export const GameTitle = styled.h1`
    color: #FFFFFF;
    margin: 12px 0px;
`

export const GameInfosWrapper = styled.div`
    display: flex;
    width: 100%;
`