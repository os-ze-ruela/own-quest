import styled from "styled-components";


export const LoginStyle = styled.div`
    background-color: #282C3E;
    width: 100%;
    padding: 40px 0;
`

export const FieldsDiv = styled.div`
    width: 70%;
    padding-left: 40px;
    `

export const Title = styled.h1`
    font-weight: bold;
    color: white;
    padding: 1.5rem 0px 0px;
    font-size: 3.5rem;
    margin-left: 0.1em;
    font-family: FiraCode-Bold;
    font-weight: 700;
    `

export const SubTitle = styled.p`
color: white;
font-family: FiraCode-Regular;
    font-weight: 300;
    margin-left: 0.5em;
    opacity: 60%;
`

export const RegisterText = styled.p`
    color: white;
    margin-top: 12px;
    font-family: FiraCode-Regular;
    font-weight: 500;
    margin-left: 0.5em;
`

export const RegisterLink = styled.a`
    color: #4d92cb;
    cursor: pointer;
    text-decoration: none;
    &:hover a{
        color: #E0E1DD;
    }
    font-family: FiraCode-SemiBold;
    font-weight: 500;
`

export const LoginInputs = styled.div`
    width: 70%;
`

export const LoginRecoverItemsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 70%;
`

export const RecoverText = styled.p`
    color: white;
    margin-top: 30px;
    font-family: FiraCode-Regular;
    font-weight: 500;
    margin-left: 0.5em;
    text-align: end;
`
export const RecoverLink = styled.a`
    color: #4d92cb;
    cursor: pointer;
    text-decoration: none;
    &:hover a{
        color: #E0E1DD;
    }
    font-family: FiraCode-SemiBold;
    font-weight: 500;
`
export const Label = styled.label`
    margin-left: 0.5em;
    color: #FFFFFF99;
    font-family: FiraCode-Light;
    font-weight: 300;
`

export const InputButtonDiv = styled.div`
    position: relative;
    width: 100%;
`
export const HideButton = styled.img`
    position: absolute;
    right: 2px;
    top: 50%;
    transform: translateY(-50%);
    width:35px;
    height:35px;
    /* padding-left: 670px; */
`
export const Input = styled.input`
    display: flex;
    /* margin-left: 0.5em; */
    flex-direction: column;
    background-color: #30354B;
    color: white;
    font-family: FiraCode-Regular;
    margin-bottom: 1em;
    border: none;
    border-radius: 0.7em;
    width: 100%;
    height: 40px;

`
export const ImgAstro = styled.img`

    @keyframes float {
        0% {
		transform: translatey(0px);
        }
        50% {
            transform: translatey(-20px);
        }
        100% {
            transform: translatey(0px);
	    }
    }

    position: absolute;
    width: 290px;
    height: 380px;
    margin-left: 1120px;
    margin-top: 50px;
    animation: float 3s ease-in-out infinite;
    
`

export const ButtonLogin = styled.button`
    background-color: #568EA3;
    color: #FFF;
    margin-top: 0.5em;
    padding: 0.2em 1.8em;
    text-decoration: none;
    transition: 0.5s;
    border-radius: 0.8em;
    font-size: 1.2em;
    width: max-content;
    cursor: pointer;
    font-family: FiraCode-SemiBold;
    font-weight: 500;
    border-color: transparent;
`

