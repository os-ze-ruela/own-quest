import styled from 'styled-components';

export const SearchGamesStyle = styled.div`
  background-color: #282C3E;
  overflow: hidden;
  width: 100%;
  -moz-box-sizing: border-box; 
  -webkit-box-sizing: border-box; 
  box-sizing: border-box; 
  
  @media screen and (max-width: 1024px) {
    padding: 4px 12px;
  }
`

export const SearchGameWrapContainer = styled.div`
    position: relative;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;

    button {
      background-color: transparent;
      text-decoration: none;
      border-style: none;
    }
`
export const ListSearchGamesCardContainer = styled.div`
    position: relative;
    /* display: flex; */
    /* flex-wrap: wrap; */
    width: 100%;
    gap: 1rem;
    padding: 0px 2rem;
    transition: all 1s ease-in-out;

    display: grid;
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;

    grid-template-columns: repeat(4, 1fr);
    
    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
`;

export const TitleSearchGame = styled.div`
    font-weight: bold;
    color: white;
    padding-top: 0.5rem;
    padding-bottom: 0.5em;
    font-size: 2.0rem;
    margin-left: 0.5em;
    font-family: FiraCode-Bold;
    font-weight: 700;

    @media screen and (max-width: 1024px) {
      font-size: 1.5rem;
      padding-bottom: 12px;
    }
`

export const CardSearchGameWrapper = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #202331;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  transition: all 0.2s ease-in-out;
  height: auto;
  text-decoration: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;

  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-right: 2rem;
  }
`;

export const SearchGameImageSpace = styled.div`
  height: 40%;
  width: 100%;
`

export const CardSearchGameImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  mask-image: linear-gradient(to bottom, #000, rgba(0,0,0,0.0));
`;

export const CardSearchGameContentWrapper = styled.div`
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
    max-height: 4em; /* Set the maximum height to 3 lines */
    overflow: hidden; /* Hide any overflowing text */
    text-overflow: ellipsis; /* Add ellipsis at the end of the text */
  }
 
`;

export const CardSearchGameTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  margin-top: 12px;
`;

export const TitleWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
`

export const NoSearchedGames = styled.div`
    width: 100%;
    display: flex;
    margin-top: 1rem;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    text-align: center;
`