import styled from "styled-components";
import { CreationContext } from "../../../contexts/creation";
import { useContext } from "react";

import ASTRO_LAPIS from "../../../assets/img/astrounauta-lapis.svg";

export const NoPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #282C3E;
  width: 60%;
  height: 80%;
  max-width: 1024px;
  max-height: 720px;
  margin: 0 auto;
  text-align: center;
  flex-direction: column;
  border-radius: 5px;
  color: #FFFFFF;
  font-family: 'FiraCode-Light';

  @media screen and (max-width: 1024px) {
    width: 80%;
    height: 80%;
  }
`;

function NoPagePlaceholder() {
    const {pages,setPages} = useContext(CreationContext)
    const {indexSelected, setIndexSelected} = useContext(CreationContext)

    return (
        <NoPage>
            <img src={ASTRO_LAPIS} alt="" />
            <p>Clique no botão abaixo [+] para adicionar a sua primeira página</p>
        </NoPage>
    )
  }


  export default NoPagePlaceholder