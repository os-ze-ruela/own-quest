import React from 'react';
import { GAME_DESCRIPTION } from '../../core/app-urls';
import Category from '../../models/Category';
import { Button, ButtonWrapper, CategoryLabel, CategoryLabelWrapper } from '../../styles/HomeLogged';
import { CardSearchGameContentWrapper, CardSearchGameImage, CardSearchGameTitle, CardSearchGameWrapper, SearchGameImageSpace } from '../../styles/SearchGamesComponent';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';

type CardSearchGameProps = {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
    isPublished: boolean;
    categories: Category[];
};

const CardSearchGame: React.FC<CardSearchGameProps> = ({ id, imageSrc, title, description, isPublished, categories}) => {
    return (
        <CardSearchGameWrapper href={GAME_DESCRIPTION + '/' + id} >
            <SearchGameImageSpace>
                {imageSrc ? 
                <CardSearchGameImage src={imageSrc} alt={title} />
                :
                <ImagePlaceholder/>
                }
            </SearchGameImageSpace>
            <CardSearchGameContentWrapper>
                <CardSearchGameTitle>{title}</CardSearchGameTitle>
                <p className='description'  title={description}>{description}</p>
                <CategoryLabelWrapper className='category-label-wrapper'>
                    {categories.map((category) => (
                        <CategoryLabel key={category.id} color={category.color}>
                            {category.title}
                        </CategoryLabel>
                    ))}
                </CategoryLabelWrapper>
                <ButtonWrapper className='button-wrapper'>
                    <Button href='' >{'Jogar'}</Button>
                </ButtonWrapper>
            </CardSearchGameContentWrapper>
        </CardSearchGameWrapper>
    );
};

export default CardSearchGame;

