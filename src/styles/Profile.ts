import styled from "styled-components";

export const ProfileStyle = styled.div`
    width: 100%;
    flex-direction: row;
    display: flex;
`

export const ProfileOpt = styled.div`
    width: 35%;
    padding-left: 40px;
    flex-direction: column;
    padding-top: 0.5em;
`

export const ProfileIdent = styled.div`
    flex-direction: row;
    display: flex;
    padding-bottom: 2.5em;
    align-items: center;
`
export const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border: 2px solid #FFFFFF;
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    margin-right: 0.5em;
    margin-top: 0.9em
`
export const NameEmail = styled.div`
    flex-direction: column;
    justify-content: space-between;
    display: grid;
`

export const Name = styled.p`
    color: white;
    font-family: FiraCode-Bold;
    font-weight: 500;
    font-size: 20px;
`
export const Email = styled.b`
    color: white;
    font-family: FiraCode-Light;
    font-weight: 450;
    line-height: 0.1;
    font-size: 16px;
`
export const BtnOpt = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 11px 1rem;
    margin-bottom: 0.5em;
    gap: 2rem;
    border-style: none;
    cursor: pointer;

    width: 100%;
    max-width: 350px;
    height: 50px;

    background: #202331;
    border-radius: 4px;

    flex: none;
    order: 1;
    flex-grow: 0;

    // Font

    color: #FFFFFF;
    font-size: 14pt;
    transition: all 0.3s ease-in-out 0.2s;
    font-family: FiraCode-Regular;
    font-weight: 300;
    text-decoration: none;
   
    &:hover {
        color: #b0b0b0;
        transform: scale(1.05);
        cursor: pointer;
    }
`
export const ProfileInfo = styled.div`
    width: 60%;
    flex-direction: column;
`
export const YourProfileTitle = styled.p`
    color: white;
    font-family: FiraCode-Bold;
    font-weight: 600;
    font-size: 30px;
`
export const Separator = styled.hr`
    border-bottom: 1px solid #ccc;
`
export const WrapTextButton = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const Text = styled.div`
    flex-direction: column;
`
export const EditButton = styled.button`
    width: 12%;
    height: 20%;
    background-color: #202331;
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    align-self: center;
    font-family: FiraCode-light;
    font-weight: 400;
    font-size: 14px;
    padding: 0.5em;
`

export const Titles = styled.p`
    color: white;
    font-family: FiraCode-light;
    font-weight: 600;
    font-size: 18px;
`
export const TitlesInfo = styled.p`
    color: white;
    font-family: FiraCode-light;
    font-weight: 400;
    font-size: 16px;
    padding-bottom: 0.7em;
`
export const Select = styled.select`
    width: 45%;
    height: 6.5%;
    background-color: #282C3E;
    color: white;
`
export const LoginInfo = styled.div`
    width: 60%;
    flex-direction: column;
`
export const LoginTitle = styled.p`
    color: white;
    font-family: FiraCode-Bold;
    font-weight: 600;
    font-size: 30px;
`
export const Text2 = styled.div`
    flex-direction: column;
    width: 60%;
`
export const BtnCancel = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 11px 1rem;
    margin-bottom: 0.5em;
    gap: 2rem;
    border-style: none;
    cursor: pointer;

    width: 100%;
    max-width: 350px;
    height: 50px;

    background: #202331;
    border-radius: 4px;

    flex: none;
    order: 1;
    flex-grow: 0;

    // Font

    color: #FFFFFF;
    font-size: 14pt;
    transition: all 0.3s ease-in-out 0.2s;
    font-family: FiraCode-Regular;
    font-weight: 300;
    text-decoration: none;
   
`
