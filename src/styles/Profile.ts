import styled from "styled-components";

export const ProfileStyle = styled.div`
    width: 100%;
    flex-direction: row;
    display: flex;

    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`

export const ProfileOpt = styled.div`
    width: 35%;
    padding-left: 40px;
    flex-direction: column;
    padding-top: 0.5em;

    @media screen and (max-width: 1024px) {
        padding-left: 18px;
        width: 85%;
        padding-top: 0px;
    }
`

export const ProfileIdent = styled.div`
    height: 150px;
    display: flex;
    align-items: center;
    flex-direction: row;
`
export const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border: 2px solid #FFFFFF;
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    margin-right: 1.2em;
    margin-top: 0.9em
`
export const NameEmail = styled.div`
    display: grid;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 0.9em;
    padding-bottom: 1.5em;
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

    &.active {
    color: #b0b0b0;
    transform: scale(1.05);
  }
`
export const ProfileInfo = styled.div`
    width: 60%;
    flex-direction: column;
    margin-bottom: 2rem;

    @media screen and (max-width: 1024px) {
        width: 85%;
        padding-left: 24px;
    }
`
export const YourProfileTitle = styled.p`
    color: white;
    font-family: FiraCode-Bold;
    font-weight: 600;
    font-size: 30px;
`
export const Separator = styled.hr`
    border-bottom: 1px solid #FFFFFF9E;
    border-radius: 12px;
`
export const WrapTextButton = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 1024px) {
       flex-direction: column;
        align-items: flex-start;
        padding-bottom: 1rem;
    }
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

    @media screen and (max-width: 1024px) {
        width: 30%;
        align-self: flex-start;
    }
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
export const HistoricTitle = styled.p`
    color: white;
    font-family: FiraCode-Bold;
    font-weight: 600;
    font-size: 30px;
`
export const WrapCardGame = styled.div`
    flex-direction: column;
    width: 60%;
    display: flex;
`
export const CardGame = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 120px;
    border-radius: 0.5rem;
    background-color: #202331;
    position: relative;
    margin-bottom: 20px;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        background-color: #323440;
    }
`

export const CardInfos = styled.div`
    flex-direction: column;
    height: fit-content;
    justify-content: space-around;
    align-items: flex-start;
    padding-left: 0.5em;
`
export const CardTitle = styled.b`
    color: white;
    font-family: FiraCode-Bold;
    font-weight: 600;
    font-size: 25px;
    /* margin-top: 30px; */
    padding-top: 0.3rem;
    position: absolute;
`
export const CardSubInfos = styled.h1`
    font-family: FiraCode-light;
    font-weight: 300;
    color: white;
    font-size: 11px;
    padding-top: 35px;
    padding-left: 0.5em;
`
interface CardStatusInfosProps {
    status: string;
}

const getStatusColor = (status: string): string => {
    const colorMap: { [key: string]: string } = {
        'Em andamento': '#FEE504',
        'Finalizado': '#66AB4E',
        'Interrompido por nova versão': '#DC4747',
    };

    return colorMap[status] || 'black';
};

export const CardStatusInfos = styled.h1<CardStatusInfosProps>`
  font-family: FiraCode-medium;
  font-weight: 300;
  color: ${props => getStatusColor(props.status)};
  font-size: 13px;
  padding-top: 28px;
  position: absolute;
  bottom: 0;
`
export const ButtonHist = styled.a`
    background-color: #568EA3;
    text-decoration: none;
    border-style: none;
    font-weight: bold;
    font-size: 12pt;
    height: 40px;
    padding: 0 12px;
    margin-right: 10px;
    margin-bottom: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    color: #E0E1DD;
    border: transparent;
    border-radius: 8px;
    cursor: pointer;
    font-family: FiraCode-SemiBold;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.2s ease-in-out;
    
    &:hover {
        transform: scale(1.02);
    }

    @media screen and (max-width: 1024px) {
        font-size: 1rem;
    }

`