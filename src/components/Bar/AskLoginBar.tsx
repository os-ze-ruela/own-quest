import styled from 'styled-components'
import { LOGIN } from '../../core/app-urls'

export const Bar = styled.div`
    height: 170px ;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #202331;
`
export const BarTitle = styled.h4`
    font-size: 1.5em;
    color: white;
    font-family: FiraCode-Semibold;
    font-weight: 700;
`
// export const ButtonLogin = styled.button`
//     background-color: #568EA3;
//     color: #FFF;
//     padding: 0.5em 1em;
//     text-decoration: none;
//     transition: 0.5s;
//     border-radius: 0.5em;
//     font-size: 1.2em;
//     width: fit-content;
//     cursor: pointer;
//     font-family: FiraCode-SemiBold;
//     font-weight: 400;
//     border-color: transparent;
// `

export const ButtonLogin = styled.a`
    background-color: #568EA3;
    color: #FFF;
    padding: 0.5em 1em;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 0.5em;
    font-size: 1.2em;
    width: fit-content;
    cursor: pointer;
    font-family: FiraCode-Semibold;
    font-weight: 400;
    border-color: transparent;
`

function AskLoginBar() {
    return (
        <Bar>
            <BarTitle>Já possui uma conta?</BarTitle>
            <ButtonLogin href={LOGIN}>Entre agora com sua conta aqui</ButtonLogin>
        </Bar>
    )
}

export default AskLoginBar