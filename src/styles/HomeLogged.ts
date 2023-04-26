import styled from 'styled-components';

type CategoryLabelProps = {
  color: string;
};

export const LoggedStyle = styled.div`
    background-color: #282C3E;
    width: 100%;
    padding: 12px 24px;
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
     box-sizing: border-box; 
    
`

export const Title = styled.div`
    font-weight: bold;
    color: white;
    padding-top: 0.5rem;
    padding-bottom: 0.5em;
    font-size: 2.0rem;
    margin-left: 0.5em;
    font-family: FiraCode-Bold;
    font-weight: 700;
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

export const CardWrapperCard = styled.div`
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
  justify-content: center;
  flex-direction: column;
  color: white;
  margin: 0px 1rem;
  text-align: end;
  font-family: 'FiraCode-Regular';

 p { 
  font-family: 'FiraCode-Light';
  font-size: 0.9rem;
 }
 
`;

export const CardTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 24px;
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
  font-size: 12px;
  font-weight: 500;
  /* background-color: ${(props) => props.color}; */
  background: linear-gradient(to right, ${(props) => props.color}, ${(props) => props.color+'AD'});
  color: #ffffff;
  padding: 4px 8px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transition: all 0.2s ease-in-out;
`;

export const Button = styled.button`
  background-color: #6C5B7B;
  color: #ffffff;
  border-radius: 4px;
  padding: 8px 16px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;

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
  /* max-width: 1100px; */
  margin: 0 auto;
`;


export const CardUserGameWrapper = styled.div`
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

  p { 
    font-family: 'FiraCode-Light';
    font-size: 0.9rem;
  }
 
`;

export const CardUserGameTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  margin-top: 12px;
`;