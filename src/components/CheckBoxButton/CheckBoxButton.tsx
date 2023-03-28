import React from 'react';
import styled from 'styled-components';

interface CheckBoxButtonProps {
  checked: boolean;
  onClick: () => void;
}

const CheckBoxButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  padding: 0;
  border: 2px solid #282C3E;
  border-radius: 4px;
  background-color: ${({ checked }: CheckBoxButtonProps) =>
    checked ? '#282C3E' : 'transparent'};
  cursor: pointer;
`;

const CheckmarkIcon = styled.svg`
  fill: none;
  stroke: green;
  stroke-width: 2px;
`;

const CheckBoxButton: React.FC<CheckBoxButtonProps> = ({
  checked,
  onClick,
}) => {
  return (
    <CheckBoxButtonContainer checked={checked} onClick={onClick}>
      {checked && (
        <CheckmarkIcon viewBox="0 0 24 24">
          <path d="M6 12L10 16L18 6" />
        </CheckmarkIcon>
      )}
    </CheckBoxButtonContainer>
  );
};

export default CheckBoxButton;
