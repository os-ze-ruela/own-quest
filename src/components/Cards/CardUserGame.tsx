import React from 'react';
import { GAME } from '../../core/app-urls';
import Category from '../../models/Category';
import { Button, ButtonWrapper, CardUserGameContentWrapper, CardUserGameImage, CardUserGameTitle, CardUserGameWrapper, CategoryLabel, CategoryLabelWrapper, UserGameImageSpace, UserGameState } from '../../styles/HomeLogged';

type CardUserGameProps = {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
    isPublished: boolean;
    categories: Category[];
};

const CardUserGame: React.FC<CardUserGameProps> = ({ id, imageSrc, title, description, isPublished, categories }) => {

    return (
        <CardUserGameWrapper >
            <UserGameState isPublished={isPublished ? 'true' : 'false'}>
                <p>{isPublished ? 'Publicado' : 'Editando'}</p>
            </UserGameState>
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
                    <Button href={GAME + '/' + id} >{isPublished ? 'Jogar' : 'Editar'}</Button>
                </ButtonWrapper>
            </CardUserGameContentWrapper>
        </CardUserGameWrapper>
    );
};

export default CardUserGame;

