import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.input`
  border: none;

  cursor: pointer;
  width: 40px;
  height: 40px;
`;

const ColorPickerContainer = styled.div`

`;

const ColorPicker = () => {
  const [color, setColor] = useState('#568EA3');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <ColorPickerContainer>
      <Button type="color" value={color} onChange={handleChange} />
    </ColorPickerContainer>
  );
};

const ButtonWithColorPicker = () => {


  return (
    <>
      <ColorPicker></ColorPicker>
    </>
  );
};

export default ButtonWithColorPicker;
