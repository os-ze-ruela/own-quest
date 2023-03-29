import React from 'react'
import styled from 'styled-components'

const Bar = styled.div`
    height: 170px ;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #202331;
`
const BarTitle = styled.h4`
    font-size: 1.5em;
    color: white;
    font-family: FiraCode-Semibold;
    font-weight: 700;
`
// export const ButtonRegister = styled.button`
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
`

function AskRegisterBar() {
    return (
        <Bar>
            <BarTitle>Ainda não possui uma conta?</BarTitle>
            <ButtonRegister href='register'>Crie sua conta grátis agora</ButtonRegister>
        </Bar>
    )
}

export default AskRegisterBar