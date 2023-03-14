import React from 'react';
import styled from 'styled-components';

type AddContentCardProps = {
  onClick: () => void;
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #202331;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 500px;
  height:220px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-top: 50px;
`;

const Button = styled.button`
  background-color: transparent;
  color: #ffffff;
  border: none;
  font-size: 120px;
  font-weight: 600;
  line-height: 0;
  cursor: pointer;

  &:hover {
        color: #b0b0b0;
        transform: scale(1.05);
        cursor: pointer;
    }
`;

const Text = styled.p`
  font-size: 20px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  margin-top: 40px;
 
`;

const EmptyCard: React.FC<AddContentCardProps> = ({ onClick }) => {
  return (
    <CardWrapper>
      <ButtonWrapper>
        <Button onClick={onClick}>+</Button>
        <Text>Criar uma nova história</Text>
      </ButtonWrapper>
    </CardWrapper>
  );
};

export default EmptyCard;
