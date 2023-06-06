import styled from "styled-components";

export const CardContinuePlayingWrapper = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #202331;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 23%;
  min-width: 300px;
  transition: all 0.2s ease-in-out;
  height: 400px;
  text-decoration: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    .button-wrapper {
      opacity: 1;
      margin-top: 1rem;
    }

  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

export const GamePlayingImageSpace = styled.div`
  height: 45%;
  width: 100%;
`

export const CardPlayingGameContentWrapper = styled.div`
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
    margin: 4px 0px;
  }
 
`;

export const CardPlayGameTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  margin-top: 12px;
`;

export const ButtonPlayingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease-in-out;
  font-family: 'FiraCode-Light';
  margin: 8px 0px;
`;

export const ButtonPlaying = styled.a`
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