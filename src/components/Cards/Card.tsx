import React from 'react';
import Category from '../../models/Category';
import { Button, ButtonWrapper, CardContentWrapper, CardImage, CardTitle, CardWrapperCard, CategoryLabel, CategoryLabelWrapper, ImageSpace } from '../../styles/HomeLogged';

type CardProps = {
  imageSrc: string;
  title: string;
  description: string;
  categories: Category[];
};





const Card: React.FC<CardProps> = ({ imageSrc, title, description, categories }) => {

  return (
    <CardWrapperCard >
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
    </CardWrapperCard>
  );
};

export default Card;

