import styled from "styled-components";

export const GameHistoryStyle = styled.div`
    width: 100%;
    flex-direction: column;
    display: flex;

    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`

export const TitleWrap = styled.div`
    width: 100%;
    flex-direction: row;
    display: flex;
`

export const Title = styled.p`
    color: white;
    font-family: FiraCode-Light;
    /* font-weight: 600; */
    font-size: 30px;
    margin: 0px;
    margin-top: 1rem;
    margin-left: 24px;

    @media (max-width: 768px) {
        font-size: 20px;
        margin-top: 12px;
        margin-left: 12px;
        margin-right: 12px;
    }
`
export const HistoryName = styled.h1`
    color: white;
    font-family: FiraCode-Bold;
    font-weight: 600;
    font-size: 30px;
    margin: 0px;
    margin-top: 1rem;
    margin-left: 24px;

    @media (max-width: 768px) {
        font-size: 20px;
        margin-top: 12px;
        margin-left: 12px;
        margin-right: 12px;
    }
`

export const GameHistoryDate = styled.p`
    color: white;
    font-family: FiraCode-Light;
    /* font-weight: 600; */
    font-size: 20px;
    margin: 0px;
    margin-top: 1rem;
    margin-left: 24px;

    @media (max-width: 768px) {
        font-size: 20px;
        margin-top: 12px;
        margin-left: 12px;
        margin-right: 12px;
    }
`