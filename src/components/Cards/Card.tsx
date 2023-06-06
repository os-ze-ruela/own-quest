import React from 'react';
import { GAME_DESCRIPTION } from '../../core/app-urls';
import Category from '../../models/Category';
import { PlayButtonWrapper } from '../../styles/Explorer';
import { Button, CardContentWrapper, CardImage, CardTitle, CardWrapperCard, CategoryLabel, CategoryLabelWrapper, ImageSpace } from '../../styles/HomeLogged';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';

type CardProps = {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
  categories: Category[];
};





const Card: React.FC<CardProps> = ({ id, imageSrc, title, description, categories }) => {

  return (
    <CardWrapperCard href={GAME_DESCRIPTION + '/' + id}>
      <ImageSpace>
        {imageSrc ?
          <CardImage src={imageSrc} alt={title} />
          :
          <ImagePlaceholder />
        }
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
        <PlayButtonWrapper className='button-wrapper'>
          <Button>Jogar</Button>
        </PlayButtonWrapper>
      </CardContentWrapper>
    </CardWrapperCard>
  );
};

export default Card;

