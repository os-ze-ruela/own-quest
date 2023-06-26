import styled from 'styled-components';

type CategoryLabelProps = {
    color: string | undefined;
}

export const UserInfosMain = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;
    padding: 0px 2rem;

    h2 {
        color: #FFFFFF;
        margin: 12px 0px;
        margin-top: 3rem;
        font-family: FiraCode-Bold;
    }
`

export const UserNickname = styled.h1`
    color: #FFFFFF;
    margin: 12px 0px;
    font-family: FiraCode-Bold;
`

export const UserInfosWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-top: 2rem;
    gap: 1rem;
    @media screen and (max-width: 512px) {
        flex-direction: column;
    }
`

export const UserPhotoWrapper = styled.div`
    height: 100%;
    width: 30%;
    max-width: 300px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const UserPhoto = styled.img` 
    height: 100%;
    width: 100%;
    object-fit: contain;
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.25);
    border: 6px solid #FFFFFF;

    @media screen and (max-width: 768px) {
        border: 3px solid #FFFFFF;
    }
`

export const UserPhotoPlaceholder = styled.div`
    display: flex;
    object-fit: contain;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.25);
    border: 6px solid #FFFFFF;

    width: 100%;
    height: 0;
    padding-bottom: 50%;
    padding-top: 50%;
    border-radius: 50%;

    background-color: #568EA3;

    // Font

    color: #FFFFFF;
    font-size: 100pt;
    transition: all 0.3s ease-in-out 0.2s;
    font-family: FiraCode-Regular;
    font-weight: 300;
    text-decoration: none;


    @media screen and (max-width: 768px) {
        font-size: 40pt;
        border: 3px solid #FFFFFF;
    }
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

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        gap: 0;
    }
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
    overflow: hidden;
`;

export const CategoryInfoLabel = styled.span<CategoryLabelProps>`
    font-size: 10px;
    font-weight: 500;
    /* background-color: ${(props) => props.color}; */
    background: linear-gradient(to right, ${(props) => props.color}, ${(props) => props.color + 'AD'});
    color: #ffffff;
    padding: 4px 8px;
    font-family: FiraCode-Light; 
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    border-radius: 16px;
`;

export const UserActionsWrapper = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;

    @media screen and (max-width: 512px) {
       width: 100%;
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

    &.following {
        background-color: rgba(80, 110, 110, 0.7);
    }

    &.blocked {
        background-color: rgba(80, 80, 80, 0.5);
    }

    &:hover {
        cursor: pointer;
        background-color: rgba(86, 142, 163, 0.7);
    }
`

export const GameListContainer = styled.div`
    position: relative;
    width: 100%;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 500px;

    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;

    button {
        background-color: transparent;
        text-decoration: none;
        border-style: none;
      }
`

export const ListGamesCardContainer = styled.div.attrs((props: { translateX: string, }) => props)`
    position: relative;
    display: flex;
    justify-content: start-flex;
    overflow: scroll;
    width: 100%;
    gap: 1rem;
    padding: 0px 2rem;
    flex-wrap: wrap;

    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;
    
    transition: all 1s ease-in-out;
    transform: translateX(${(props) => (props.translateX)});

    @media screen and (max-width: 1024px) {
        // justify-content: left;
        gap: 1rem;
    }
`;
