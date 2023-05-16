import React from 'react';
import { GAME } from '../../core/app-urls';
import Category from '../../models/Category';
import { Button, ButtonWrapper, CategoryLabel, CategoryLabelWrapper } from '../../styles/HomeLogged';
import { CardMyGameContentWrapper, CardMyGameImage, CardMyGameTitle, CardMyGameWrapper, MyGameImageSpace, MyGameState } from '../../styles/MyGames';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';

type CardMyGameProps = {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
    isPublished: boolean;
    categories: Category[];
};

const CardMyGame: React.FC<CardMyGameProps> = ({ id, imageSrc, title, description, isPublished, categories}) => {

    return (
        <CardMyGameWrapper >
            <MyGameState isPublished={isPublished ? 'true' : 'false'}>
                <p>{isPublished ? 'Publicado' : 'Editando'}</p>
            </MyGameState>
            <MyGameImageSpace>
                {imageSrc ? 
                <CardMyGameImage src={imageSrc} alt={title} />
                :
                <ImagePlaceholder/>
                }
            </MyGameImageSpace>
            <CardMyGameContentWrapper>
                <CardMyGameTitle>{title}</CardMyGameTitle>
                <p className='description'  title={description}>{description}</p>
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
            </CardMyGameContentWrapper>
        </CardMyGameWrapper>
    );
};

export default CardMyGame;

