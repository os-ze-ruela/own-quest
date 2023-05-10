import { FaHeart } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

export const UserInfosMain = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;
    padding: 0px 2rem;
`

export const UserNickname = styled.h1`
    color: #FFFFFF;
    margin: 12px 0px;
`

export const UserInfosWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-top: 2rem;
    gap: 1rem;
`

export const UserPhotoWrapper = styled.div`
    height: 100%;
    width: 30%;
    max-width: 300px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.3);
`

export const PhotoUser = styled.img` 
    height: 100%;
    width: 100%;
    border-radius: 50%;
    border: 2px solid #FFFFFF;
    object-fit: contain;
`

export const UsersInfosWrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
`

export const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 6rem;
`

export const DescriptionInfoWrapper = styled.div`
    display: flex;
    flex-direction: column; 
    color: #FFFFFF;
    font-family: FiraCode-SemiBold;
    font-size: 15px;
    gap: 8px;

    h3 {
        margin: 0px;
        margin-top: 2rem;
        margin-left: 2rem;
    }

    p {
        margin: 0px;
        margin-left: 2rem;
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
        margin-top: 2rem;
        margin-left: 2rem;
    }
`

export const CategoryInfoWrapper = styled.div`
    display: flex;
    margin-left:2rem;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    opacity: 1;
    border-radius: 16px;
    overflow: hidden;
`;

export const CategoryInfoLabel = styled.a.attrs((props: { color: string, }) => props)`
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
    
    p {
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

export const UserActionsWrapper = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
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

export const FollowButton = styled.button`
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

    &.followed {
        background-color: rgba(86, 142, 163, 0.6);
    }

    &:hover {
        cursor: pointer;
        background-color: rgba(86, 142, 163, 0.7);
    }
`