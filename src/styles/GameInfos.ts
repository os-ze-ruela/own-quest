import { FaHeart } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

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
    margin-top: 2rem;
    gap: 1rem;

    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`

export const GameImageWrapper = styled.div`
    height: 100%;
    width: 30%;
    max-width: 300px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.3);

    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`

export const ImageGame = styled.img` 
    height: 100%;
    width: 100%;
    border-radius: 8px;
    object-fit: contain;
`

export const GamesInfosWrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`

export const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
    font-family: FiraCode-SemiBold;
    font-size: 15px;
    gap: 8px;

    h3 {
        margin: 0px;
    }
    
    p {
        margin: 0px;
        font-family: FiraCode-Light; 
        font-size: 14px;
    }
`

export const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
    font-family: FiraCode-SemiBold;
    font-size: 15px;
    gap: 8px;

    h3 {
        margin: 0px;
    }
`

export const CategoryGameInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    opacity: 1;
    border-radius: 16px;
    overflow: hidden;
`;

export const CategoryGameInfoLabel = styled.a.attrs((props: { color: string, }) => props)`
    font-size: 10px;
    font-weight: 500;
    /* background-color: ${(props) => props.color}; */
    background: linear-gradient(to right, ${(props) => props.color}, ${(props) => props.color + 'AD'});
    color: #ffffff;
    padding: 4px 8px;
    font-family: FiraCode-Light; 
    transition: all 0.3s ease-in-out;
    text-decoration: none;

    &:hover {
        cursor: pointer;
        background: linear-gradient(to right, ${(props) => props.color}, ${(props) => props.color + '44'});
    }
`;

export const CreatedByWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
    font-family: FiraCode-SemiBold;
    font-size: 15px;
    gap: 8px;

    h3 {
        margin: 0px;
    }
    

    a {
        text-decoration: none;
    }

    p {
        color: #FFFFFF;
        margin: 0px;
        font-family: FiraCode-Light; 
        font-size: 14px;
        transition: all 0.3s ease-in-out;

        &:hover {
            transform: scale(1.05);
            cursor: pointer;
        }
    }
    
`

export const GameActionsWrapper = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;

    @media screen and (max-width: 1024px) {
        width: 100%;
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: 2rem;
    }
    
`

export const DenounceButton = styled.button`
    height: 40x;
    padding: 12px 0px;
    width: 110px;
    border-radius: 4px;
    text-decoration: none;
    background-color: transparent;
    border: none; 
    border: solid 2px #E03140;
    padding: 0px;
    font-size: 15px;
    color: #FFFFFF;
    transition: all 0.2s ease-in-out;
    font-family: FiraCode-Light;
    margin-bottom: 1rem;

    &:hover {
        cursor: pointer;
        background-color: #E03140;
    }
`

export const PlayButton = styled.button`
    height: 47px;
    width: 125px;
    background-color: #568EA3;
    border-radius: 8px;
    text-decoration: none;
    border: none;
    padding: 0px;
    font-size: 20px;
    color: #FFFFFF;
    transition: all 0.2s ease-in-out;
    font-family: FiraCode-Regular;

    &:hover {
        cursor: pointer;
        background-color: rgba(86, 142, 163, 0.7);
    }
`

export const LikeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    color: #FFFFFF;
    font-family: FiraCode-Regular;

    p {
        margin: 0px;
        margin-top: 6px;
    }
`

export const LikeIcon = styled.div``


const likeAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
`;

export const HeartIcon = styled(FaHeart) <{ liked: boolean }>`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 48px;
    cursor: pointer;
    color: ${({ liked }) => (liked ? 'red' : 'gray')};
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
        animation: ${({ liked }) => (liked ? 'none' : likeAnimation)} 0.5s linear;
    }  
`;