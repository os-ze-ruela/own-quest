import styled, { keyframes } from 'styled-components';

export const ExplorerMain = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box; 
`

export const FiltersContainer = styled.div`
    width: 100%;
    padding: 0px 2rem;
    display: flex;
    margin-top: 12px;
    font-family: 'FiraCode-Regular'; 
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box; 
`

export const SearchContainer = styled.div`
    width: 40%;
    padding: 0px 24px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #0B132B;
    border-radius: 10px;

    .search-icon {
        color: #FFFFFF;
    }
`

export const SearchInput = styled.input`
    margin-left: 1.2rem;
    width: 100%;
    height: 80%;
    color: #FFFFFF;
    background-color: #0B132B; 
    border: none;
    outline: none;
    font-family: 'FiraCode-Regular';

    input:-webkit-autofill {
        -webkit-text-fill-color: blue !important;
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
`

export const TitleListGames = styled.h3`
    color: white;
    font-size: 2.0rem;
    font-family: FiraCode-Bold;
    font-weight: 700;
    margin: 0;
    margin-left: 2rem;
`

export const PaginationContainer = styled.div`
    height: 100%;
    width: 60px;
    position: absolute;
    right: 0;
    /* top: 50px; */
    display: flex;
    justify-content: center;
    align-items: center;
    size: 100px;
    transition: all 0.2s ease-in-out;
    opacity: 0;

   .nextIcon {
        transition: all 0.3s ease-in-out;
        filter: drop-shadow(0px 0px 50px 30px rgba(0,0,0,0.3));
        opacity: 0.3;
        width: 35px;
        height: 35px;
        fill: green;

        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }
`

export const ListGamesCardContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 2rem;
    padding: 0px 2rem;

    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;


    &:hover {
        ${PaginationContainer} {
            opacity: 1;
        }
    }
`;

//! CARD MOST LIKED GAMES

export const CardMostViewGameWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #202331;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 23%;
  min-width: 250px;
  transition: all 0.2s ease-in-out;
  height: 400px;

  p {
    max-lines: 2;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #323440;

    .button-wrapper {
      transition: all 200ms 0.2s ease-in-out;
      opacity: 1;
      transform: translateY(-12px);
      margin-top: 1rem;
    }
  }
`;

export const CardMostViewGameImageSpace = styled.div`
  height: 35%;
  width: 100%;
`

export const CardMostViewGameImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  mask-image: linear-gradient(to bottom, #000, rgba(0,0,0,0.0));
`;

export const CardMostViewGameContentWrapper = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  color: white;
  margin: 0px 1rem;
  text-align: start;
  font-family: 'FiraCode-Regular';

  .description { 
    font-family: 'FiraCode-Light';
    font-size: 0.9rem;
    max-lines: 3;
    line-break: auto;
  }
 
`;

export const CardMostViewGameTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  margin-top: 12px;

  &:hover {
    cursor: pointer;
  }
`;

export const CardMostViewGameCreatedBy = styled.div`
    margin-top: 18px;
`

export const CreatedByLabel = styled.p`
    margin: 0;
`

export const CreatedByName = styled.p`
    color: #FFFFFF;
    opacity: 0.75;
    margin: 0px;
    margin-top: 4px;
    transition: all 200ms 0.2s ease-in-out;

    &:hover {
     opacity: 1;
     cursor: pointer;
    }
`


export const PlayButtonWrapper = styled.div`
    position: absolute;
    bottom: 10px;
    right: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    font-family: 'FiraCode-Light';
`;

export const PlayButton = styled.a`
  background-color: #6C5B7B;
  color: #ffffff;
  border-radius: 4px;
  padding: 8px 16px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: #8c7daf;
  }
`;

interface LoadingShimmerProps {
  width?: string;
  height?: string;
}

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const LoadingShimmer = styled.div<LoadingShimmerProps>`
  background-color: #202331;
  display: inline-block;
  height: ${(props) => props.height || '400px'};
  width: ${(props) => props.width || '95%'};
  position: relative;
  overflow: hidden;
  border-radius: 12px;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -200px;
    right: -200px;
    bottom: 0;
    background: linear-gradient(to right, #364764 0%, #3647645B 20%, #364764 40%, #364764 100%);
    background-size: 400px 100%;
    animation: ${shimmer} 1.5s infinite linear;
  }
`;