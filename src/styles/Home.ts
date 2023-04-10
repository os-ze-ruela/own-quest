import styled from "styled-components";

export const HomeDiv = styled.section`
    background-color: #282C3E;
    width: 100%;
`

export const MainContent = styled.section`
    position: relative;
    width: 80%;
    height: 80vh;
    display: grid;
    grid-template-columns: 60% 40%;
    color: #FFFFFF;
    font-family: FiraCode-Semibold;
    margin: 4px auto 24px;

    @media screen and (max-width: 1024px) {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;   
        margin-top: 1rem;
    }

`

export const MainInfos = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style-type: none;
    padding: 12px 4rem 5rem;

    h1 {
        font-size: 3.5rem;
        font-family: FiraCode-Bold;
        margin: 0; 
    }

    p {
        font-size: 1.2rem;
        width: 100%;
        line-height: 150%;
        color: rgba(255,255,255,0.4);
    }
    
    ul {
        margin: 0; 
        padding: 0;
    }
    
    li {
        font-family: FiraCode-Light;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        
    }

    li p {
        color: #FFFFFF;
    }

    
    @media screen and (max-width: 1024px) {
        padding: 12px 2rem 0.5rem;

        h1 {
            font-size: 2rem;
            font-family: FiraCode-Bold;
            margin: 0; 
        }

        p {
            font-size: 1rem;
            width: 100%;
            line-height: 120%;
            color: rgba(255,255,255,0.4);
        }
    }
`

export const ImgAstroHome = styled.img`
    width: 100%;
    position: relative;
    z-index: 1;
    bottom: -120px;
    right: -50px;

    @media screen and (max-width: 1024px) {
        width: 50%;
        position: static;
        align-self: flex-end;
        transform: translateY(20px);
    }
`

export const BannerInfo = styled.div`
    position: relative;
    z-index: 10;
    background-color: #202331;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: #FFFFFF;
    font-family: FiraCode-Semibold;
    padding: 24px 0px;
    gap: 1rem;

    p {
        text-align: center;
        margin: 0px;
    }

    @media screen and (max-width: 1024px) {
        font-size: 1.2rem;
    }
`

export const HomeActionButton = styled.a`
    all: unset;
    padding: 8px 12px;
    background-color: #568EA3;
    border: 1px solid #568EA3;
    font-size: 16px;
    color: #FFFFFF;
    border-radius: 8px;
    font-family: FiraCode-Regular;
    transition: all 200ms ease-in;

    &:hover {
       background-color: rgba(0,0,0,0);
       cursor: pointer;
    }
`

export const ListOfFuncs = styled.ul`
    margin: 2rem 0; 
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-family: FiraCode-Light;
    gap: 2rem;

    @media screen and (max-width: 1024px) {
        margin: 0.5rem 0; 
    }
`

export const FunctionItem = styled.li.attrs((props: { flexDirection: string }) => props)`
    width: 60%;
    display: flex;
    flex-direction: ${props => props.flexDirection ?? 'row'};
    align-items: center;
    justify-content: center;
    height: 240px;
    margin: 2rem 0px;

    div {
        display: flex;
        flex-direction: column;
        align-items: ${props => props.flexDirection == null ? 'flex-start' : 'flex-end'};
        text-align: ${props => props.flexDirection == null ? 'start' : 'end'};
        justify-content: center;
        flex: 40%;
    }

    div p {
        width: 60%;
        color: rgba(255,255,255,0.4);
    }

    div h3 {
        margin: 0px;
        width: 60%;
        font-size: 1.5rem;
        font-family: FiraCode-Bold;
    }

    .img-example {
        flex: 10%;
        background: grey;
        border-radius: 12px;
        height: 90%;
        width: 60%;
    }

    @media screen and (max-width: 1024px) {
        height: 200px;
        flex-direction: column;
        width: 90%;
        margin: 1rem 0px;

        div p {
            width: 100%;
            color: rgba(255,255,255,0.4);
        }

        div h3 {
            margin: 0px;
            width: 90%;
            font-size: 1rem;
            font-family: FiraCode-Bold;
        }

        .img-example {
            display: none;
        }
    }
`
