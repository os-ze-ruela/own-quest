import React from 'react';
import Category from '../../models/Category';
import { Button, ButtonWrapper, CardUserGameContentWrapper, CardUserGameImage, CardUserGameTitle, CardUserGameWrapper, CategoryLabel, CategoryLabelWrapper, UserGameImageSpace } from '../../styles/HomeLogged';

type CardUserGameProps = {
    imageSrc: string;
    title: string;
    description: string;
    categories: Category[];
};

const CardUserGame: React.FC<CardUserGameProps> = ({ imageSrc, title, description, categories }) => {

    return (
        <CardUserGameWrapper >
            <UserGameImageSpace>
                <CardUserGameImage src={imageSrc} alt={title} />
            </UserGameImageSpace>
            <CardUserGameContentWrapper>
                <CardUserGameTitle>{title}</CardUserGameTitle>
                <p className='description'>{description}</p>
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
            </CardUserGameContentWrapper>
        </CardUserGameWrapper>
    );
};

export default CardUserGame;

