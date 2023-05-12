import styled from 'styled-components';

type CategoryLabelProps = {
  color: string;
};

export const LoggedStyle = styled.div`
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

export const MyGamesPaginationContainer = styled.div.attrs((props: { direction: string, }) => props)`
    height: 100%;
    width: 80px;
    position: absolute;
    /* left: ${(props) => (props.direction === 'left' ? '0px' : 'none' )}; */
    display: flex;
    justify-content: center;
    align-items: center;
    size: 100px;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    right: ${(props) => (props.direction === 'right' ? '0px' : '94vw' )};
    border-radius: ${(props) => (props.direction === 'left' ? '0px 20px 20px 0px' : '20px 0px 0px 20px' )};  

    &:hover {
        background-color: rgba(0,0,0,0.5);
        box-shadow: 0px 0px 50px 30px rgba(0,0,0,0.3);
    }

    button {
      text-decoration: none;
      border-style: none;
      background-color: transparent;
    }

   .nextIcon {
        transition: all 0.3s ease-in-out;
        filter: drop-shadow(0px 0px 40px 30px rgba(0,0,0,0.3));
        opacity: 0.3;
        width: 35px;
        height: 35px;
        transform: ${(props) => (props.direction === 'right' ? '0' : 'rotate(180deg)')};

        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }
`

export const MyGameListContainer = styled.div`
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
    
    &:hover {
        ${MyGamesPaginationContainer} {
            opacity: 1;
        }
    } 
`

export const ListMyGamesCardContainer = styled.div.attrs((props: { translateX: string, }) => props)`
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    gap: 2rem;
    padding: 0px 1rem;
    transition: all 1s ease-in-out;
    transform: translateX(${(props) => (props.translateX)});
`;

export const Title = styled.div`
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

export const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 98%;
  gap: 2rem;
  /* max-width: 1100px; */
  margin: 12px auto;
  
`;

export const CardWrapper = styled.div`
  width: 48%;
  margin-bottom: 20px;
`;

export const CardWrapperCard = styled.a`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  background-color: #202331;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 48%;
  min-width: 400px;
  /* max-width: 500px; */
  transition: all 0.2s ease-in-out;
  height: 180px;
  text-decoration: none;
  
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
      margin-top: 12px;
    }
  }

  @media screen and (max-width: 1024px) {
      width: 100%;
    }
`;

export const ImageSpace = styled.div`
  height: 100%;
  width: 40%;
`

export const CardImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  mask-image: linear-gradient(to right, #000, rgba(0,0,0,0.0));
`;

export const CardContentWrapper = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;
  color: white;
  margin: 0px 1rem;
  padding-top: 12px;
  text-align: end;
  font-family: 'FiraCode-Regular';

 p { 
    font-family: 'FiraCode-Light';
    font-size: 12px;
    max-height: 4em; /* Set the maximum height to 3 lines */
    overflow: hidden; /* Hide any overflowing text */
    text-overflow: ellipsis; /* Add ellipsis at the end of the text */
 }
 
`;

export const CardTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  margin-top: 12px;
`;

export const CategoryLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  opacity: 1;
  transition: all 0.2s ease-in-out;
  border-radius: 16px;
  overflow: hidden;
`;

export const CategoryLabel = styled.span<CategoryLabelProps>`
  font-size: 10px;
  font-weight: 500;
  /* background-color: ${(props) => props.color}; */
  background: linear-gradient(to right, ${(props) => props.color}, ${(props) => props.color + 'AD'});
  color: #ffffff;
  padding: 4px 8px;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  font-family: 'FiraCode-Light';
`;

export const Button = styled.a`
  background-color: #6C5B7B;
  color: #ffffff;
  border-radius: 4px;
  padding: 8px 16px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: #8c7daf;
  }
`;

export const EmptyCardWrapper = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 12px 24px;
  width: 280px;
  height: 300px;
  cursor: pointer;
  font-family: 'FiraCode-Light';
  -moz-box-sizing: border-box; 
  -webkit-box-sizing: border-box; 
  box-sizing: border-box; 
`;

export const EmptyButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex: 1;
  margin-top: 50px;
`;

export const EmptyCardButton = styled.button`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'FiraCode-Light';
  border: none;
  font-size: 120px;
  font-weight: 600;
  line-height: 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
        color: #b0b0b0;
        transform: scale(1.05);
        cursor: pointer;
    }
`;

export const EmptyCardTitle = styled.p`
  font-size: 20px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  margin-top: 40px;
 
`;

//! CARD USER GAME

export const PageUserGameWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 98%;
  gap: 2rem;
  margin: 0 auto;
  margin-bottom: 2rem;
`;

export const UserGameState = styled.span.attrs((props: { isPublished: string, }) => props)`
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

export const CardUserGameWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #202331;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 25%;
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
  
    ${UserGameState} {
      opacity: 1;
    }

  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

export const UserGameImageSpace = styled.div`
  height: 40%;
  width: 100%;
`

export const CardUserGameImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  mask-image: linear-gradient(to bottom, #000, rgba(0,0,0,0.0));
`;

export const CardUserGameContentWrapper = styled.div`
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

export const CardUserGameTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  margin-top: 12px;
`;