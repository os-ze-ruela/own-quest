import styled from 'styled-components'
import { REGISTER } from '../../core/app-urls'

const Bar = styled.div`
    height: 170px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #202331;

    
    @media screen and (max-width: 1024px) {
        margin-top: 2rem;
        height: auto;
        justify-content: center;
        padding: 24px 0;
        gap: 0.5rem;
    }
`
const BarTitle = styled.h4`
    font-size: 1.5em;
    color: white;
    font-family: FiraCode-Semibold;
    font-weight: 700;

    @media screen and (max-width: 1024px) {
        margin: 0;
        font-size: 1rem;
    }
`

const ButtonRegister = styled.a`
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

    @media screen and (max-width: 1024px) {
        font-size: 0.8rem;
    }
`

function AskRegisterBar() {
    return (
        <Bar>
            <BarTitle>Ainda não possui uma conta?</BarTitle>
            <ButtonRegister href={REGISTER}>Crie sua conta grátis agora</ButtonRegister>
        </Bar>
    )
}

export default AskRegisterBar