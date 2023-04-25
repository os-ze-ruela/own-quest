import React, { useState } from 'react';
import styled from 'styled-components';
import Category from '../../models/Category';

type CardProps = {
  imageSrc: string;
  title: string;
  description: string;
  categories: Category[];
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
  width: 500px;
  transition: all 0.2s ease-in-out;
  height: 220px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    .category-label-wrapper {
      opacity: 0;
    }

    .button-wrapper {
      opacity: 1;
      transform: translateY(-12px);
    }
  }
`;

const ImageSpace = styled.div`
  height: 100%;
  width: 40%;
`

const CardImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  mask-image: linear-gradient(to right, #000, rgba(0,0,0,0.0));
`;

const CardContentWrapper = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;

  p {
    margin-right: 12px;
  }
`;

const CardTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  margin-top: 12px;
`;

const CategoryLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
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

const Card: React.FC<CardProps> = ({ imageSrc, title, description, categories }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <CardWrapper onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <ImageSpace>
        <CardImage src={imageSrc} alt={title} />
      </ImageSpace>
      <CardContentWrapper>
        <CardTitle>{title}</CardTitle>
        <p>{description}</p>
        <CategoryLabelWrapper className='category-label-wrapper'>
          {categories.map((category) => (
            <CategoryLabel key={category.id} color={category.color}>
              {category.title}
            </CategoryLabel>
          ))}
        </CategoryLabelWrapper>
        <ButtonWrapper className='button-wrapper'>
          <Button>Jogar</Button>
        </ButtonWrapper>
      </CardContentWrapper>
    </CardWrapper>
  );
};

export default Card;

