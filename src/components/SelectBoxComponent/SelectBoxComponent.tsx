import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { CreationContext } from "../../contexts/creation";

interface SelectBoxProps {
  defaultValue: string
  pageList: string[];
  onChange: (selected: string) => void;
}

const SelectBoxWrapper = styled.div`
  flex-direction: row;
  display: inline-block;
  position: relative;
  width: 200px;
`;

const SelectBox = styled.select`
  width: 100%;
  height: 40px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-family: FiraCode-Light;
  cursor: pointer;
`;

const Option = styled.option`

  font-family: FiraCode-Light;

`;


const SelectBoxComponent: React.FC<SelectBoxProps> = ({
  defaultValue,
  pageList,
  onChange,
}) => {

  const { destinyPage } = useContext(CreationContext)
  const { indexSelected } = useContext(CreationContext)

  useEffect(() => {
    console.log("destiny page = "+destinyPage)
  }, [destinyPage])

  return (
    <SelectBoxWrapper>
      <SelectBox  onChange={(e) => {
        console.log(e.target.value)
        onChange(e.target.value)
      }}>
        {destinyPage > 0  ?
              (
                <></>
              )
              :
              (
              <Option selected>{defaultValue}</Option>
              ) 
            }
            {/* <Option>Ir para página</Option> */}
            {pageList.map((page, index) => {
              if(destinyPage === index) {
                return (
                  <Option key={index} value={page} selected >
                    {page}
                  </Option>
                )} else {
                  return (
                <Option key={index} value={page}  >
                  {page}
                </Option>
              )}
            }
            )}

      </SelectBox>
    </SelectBoxWrapper>
  );
};

export default SelectBoxComponent;
