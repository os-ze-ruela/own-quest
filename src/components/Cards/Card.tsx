import React, { useState } from 'react';
import styled from 'styled-components';

type CardProps = {
  imageSrc: string;
  title: string;
  description: string;
  categories: string[];
};

type CategoryLabelProps = {
  color: string;
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  background-color: #202331;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 500px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    .category-label-wrapper {
      opacity: 0;
    }

    .button-wrapper {
      opacity: 1;
      transform: translateY(-8px);
    }
  }
`;

const CardImage = styled.img`
  flex: 1;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;




const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const CategoryLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  opacity: 1;
  transition: all 0.2s ease-in-out;
  border-radius: 16px;
  overflow: hidden;
`;

const CategoryLabel = styled.span<CategoryLabelProps>`
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => props.color};
  color: #ffffff;
  padding: 4px 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transition: all 0.2s ease-in-out;
`;

const Button = styled.button`
  background-color: #6C5B7B;
  color: #ffffff;
  border-radius: 4px;
  padding: 8px 16px;
  border: none;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: #8c7daf;
  }
`;

const categoryColors: { [key: string]: string } = {
  technology: '#8400f8',
  food: '#ddff00',
  fashion: '#0dff00',
  travel: '#f10000',
  health: '#1900ff',
};

const Card: React.FC<CardProps> = ({ imageSrc, title, description, categories }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <CardWrapper onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <CardImage src={imageSrc} alt={title} />
      <CardContentWrapper>
        <CardTitle>{title}</CardTitle>
        <p>{description}</p>
        <CategoryLabelWrapper className="category-label-wrapper">
        {categories.map((category) => (
            <CategoryLabel key={category} color={categoryColors[category]}>
              {category}
            </CategoryLabel>
          ))}
        </CategoryLabelWrapper>
        <ButtonWrapper className="button-wrapper">
          <Button>Jogar</Button>
        </ButtonWrapper>
      </CardContentWrapper>
    </CardWrapper>
  );
};

export default Card;

