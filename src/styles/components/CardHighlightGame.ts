
//! CARD MOST LIKED GAMES

import styled from "styled-components";

export const CardHighlightGameWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    min-width: 250px;
    transition: all 0.2s ease-in-out;
    height: 550px;
    background-color: #202331;

    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;

    .description {
        width: 80%;
        max-lines: 2;
    }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const CardHighlightGameImageSpace = styled.div`
  height: 50%;
  width: 100%;
`

export const CardHighlightGameImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  mask-image: linear-gradient(to bottom, #000, rgba(0,0,0,0.0));
`;

export const CardHighlightGameContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  color: white;
  margin-left: 3rem;
  text-align: start;
  font-family: 'FiraCode-Regular';

  .description { 
    font-family: 'FiraCode-Light';
    font-size: 0.9rem;
    max-lines: 3;
    line-break: auto;
  }
 
`;

export const CardHighlightGameTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  margin-top: 12px;

  &:hover {
    cursor: pointer;
  }
`;

export const CardHighlightGameCreatedBy = styled.div`
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
    opacity: 1;
    transition: all 0.2s ease-in-out;
    font-family: 'FiraCode-Light';
`;

export const PlayButton = styled.a`
  background-color: #6C5B7B;
  color: #ffffff;
  border-radius: 4px;
  padding: 10px 20px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: #8c7daf;
  }
`;