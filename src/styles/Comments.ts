import styled from "styled-components";

export const CommentsContainer = styled.div`
    width: 100%;
    margin-bottom: 2rem;

    @media screen and (max-width: 1024px) {
        width: 95%;
    }
`


export const TitleComments = styled.div`
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

export const CardComment = styled.div`
    height: 68px;
    width: 95%;
    margin-top: 1rem;
    margin-left: 0.5em;
    padding: 6px 24px;
    border-radius: 12px;
    background-color: #202331;
    display: flex;
    align-items: center;
    justify-content: space-between;
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        height: 130px;
        align-items: flex-start;
        padding: 18px 24px;
    }
`

export const NicknameAuthor = styled.a`
    text-decoration: none;
    border-style: none;
    font-weight: bold;
    color: white;
    font-size: 24px;
    font-family: FiraCode-Bold;
    font-weight: 700;
`


export const CommentContent = styled.p`
    font-weight: bold;
    color: white;
    font-size: 15px;
    font-family: FiraCode-Light; 
    
    @media screen and (max-width: 1024px) {
        font-size: 14px;
        font-family: FiraCode-Light; 
    }
`

export const DeleteCommentButton = styled.button`
    text-decoration: none;
    border-style: none;
    height: 50px;
    width: 50px;
    background-color: #E03140;
    border-radius: 10px;
    color: #FFFFFF;
    padding: 0px 8px;
    cursor: pointer;

    transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`

export const AddNewCommentInput = styled.input`
    border-style: none;
    border: none;
    outline: none;
    caret-color: #FFFFFF;
    height: 100%;
    width: 60%;
    background-color: #202331;
    color: #FFFFFF;
    font-size: 16px;
    font-family: FiraCode-Regular;
    
`

export const AddNewCommentButton = styled.button`
    border: none;
    height: 50px;
    background-color: #568EA3;
    border-radius: 10px;
    color: #FFFFFF;
    padding: 0px 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`
