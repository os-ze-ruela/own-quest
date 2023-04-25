import React from 'react';
import { EmptyButtonWrapper, EmptyCardButton, EmptyCardTitle, EmptyCardWrapper } from '../../styles/HomeLogged';

type AddContentCardProps = {
  onClick: () => void;
};



const EmptyCard: React.FC<AddContentCardProps> = ({ onClick }) => {
  return (
    <EmptyCardWrapper>
      <EmptyButtonWrapper>
        <EmptyCardButton onClick={onClick}>+</EmptyCardButton>
        <EmptyCardTitle>Criar uma nova história</EmptyCardTitle>
      </EmptyButtonWrapper>
    </EmptyCardWrapper>
  );
};

export default EmptyCard;
