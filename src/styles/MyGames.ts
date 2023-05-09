import styled from 'styled-components';

export const MyGamesStyle = styled.div`
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

export const MyGameWrapContainer = styled.div`
    position: relative;
    width: 100%;
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
export const ListMyGamesCardContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 2rem;
    padding: 0px 1rem;
    transition: all 1s ease-in-out;
`;

export const TitleMyGame = styled.div`
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



export const MyGameState = styled.span.attrs((props: { isPublished: string, }) => props)`
  position: absolute; 
  top: 10px;
  right: 10px;
  z-index: 2;
  background-color:  ${(props) => (props.isPublished === 'true' ? '#66AB4E' : '#C79334')};
  height: 25px;
  width: auto;
  max-width: 150px;
  padding: 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #FFFFFF;
  font-family: 'FiraCode-Light';
  opacity: 0;
`;

export const CardMyGameWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #202331;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 22.5%;
  min-width: 300px;
  transition: all 0.2s ease-in-out;
  height: 350px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    background-color: #323440;

    .category-label-wrapper {
      opacity: 0;
    }

    .description {
      opacity: 0;
    }

    .button-wrapper {
      opacity: 1;
      transform: translateY(-12px);
      margin-top: 1rem;
    }
  
    ${MyGameState} {
      opacity: 1;
    }

  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-right: 2rem;
  }
`;

export const MyGameImageSpace = styled.div`
  height: 40%;
  width: 100%;
`

export const CardMyGameImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  mask-image: linear-gradient(to bottom, #000, rgba(0,0,0,0.0));
`;

export const CardMyGameContentWrapper = styled.div`
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

export const CardMyGameTitle = styled.h3`
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

export const RandomDescriptionButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: left;
    align-items: center;
    padding: 2px 0px;
    margin-bottom: 0.5em;
    gap: 2rem;
    border-style: none;
    cursor: pointer;

    width: 100%;
    max-width: 320px;
    height: 32px;

    background: #75CD73;
    border-radius: 4px;

    flex: none;
    order: 1;
    flex-grow: 0;
    margin-right: 2rem;

    color: #FFFFFF;
    font-size: 10pt;
    transition: all 0.3s ease-in-out 0.2s;
    font-family: FiraCode-Regular;
    font-weight: 300;
    text-decoration: none;
   
    &:hover {
        transform: scale(1.02);
        background: #75CD73D6;
        cursor: pointer;
    }
`