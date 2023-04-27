import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import styled from "styled-components";

interface SelectBoxProps {
  selectedPage: number,
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
  selectedPage,
  pageList,
  onChange,
}) => {
  return (
    <SelectBoxWrapper>
      <SelectBox onChange={(e) => onChange(e.target.value)}>
        {selectedPage > 0  ?
              (
              <Option defaultValue={`Página ${selectedPage}`} disabled selected hidden>{`Página ${selectedPage}`}</Option>
              )
              :
              (
              <Option defaultValue={"Ir para página"} disabled selected hidden>Ir para página</Option>
              ) 
            }

        {pageList.map((page) => (
          <Option key={page} value={page}>
            {page}
          </Option>
        ))}
      </SelectBox>
    </SelectBoxWrapper>
  );
};

export default SelectBoxComponent;
