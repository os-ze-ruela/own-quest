import React from 'react';
import styled from 'styled-components';

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}

const Button = styled.input`
  background-color: transparent;
  border: 0;
  border-radius: 100%;
  cursor: pointer;
  width: 45px;
  height: 45px;
  margin-left: 1rem;
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
