import React, { useState } from 'react';
import styled from 'styled-components';

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}

const Button = styled.input`
  border: none;

  cursor: pointer;
  width: 40px;
  height: 40px;
`;

const ColorPickerContainer = styled.div`

`;

const ColorPicker = ({ color, setColor }: ColorPickerProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <ColorPickerContainer>
      <Button type="color" value={color} onChange={handleChange} />
    </ColorPickerContainer>
  );
};

// const ButtonWithColorPicker = () => {
//   return (
//     <>
//       <ColorPicker color setColor={}></ColorPicker>
//     </>
//   );
// };

export default ColorPicker;
