import React from 'react';
import Category from '../../models/Category';
import { Button, CategoryLabel, CategoryLabelWrapper } from '../../styles/HomeLogged';
import { CardHighlightGameContentWrapper, CardHighlightGameCreatedBy, CardHighlightGameImage, CardHighlightGameImageSpace, CardHighlightGameTitle, CardHighlightGameWrapper, CreatedByLabel, CreatedByName, PlayButtonWrapper } from '../../styles/components/CardHighlightGame';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';
import { GAME_DESCRIPTION } from '../../core/app-urls';

type CardHighlightGameProps = {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
    categories: Category[];
    createdByNickname: string;
};

const CardHighlightGame: React.FC<CardHighlightGameProps> = ({ id, imageSrc, title, description, categories, createdByNickname }) => {

    return (
        <CardHighlightGameWrapper href={GAME_DESCRIPTION + '/' + id} >
            <CardHighlightGameImageSpace>
                {imageSrc ? 
                <CardHighlightGameImage src={imageSrc} alt={title} />
                :
                <ImagePlaceholder/>
                }
            </CardHighlightGameImageSpace>
            <CardHighlightGameContentWrapper>
                <CardHighlightGameTitle id={title} >{title}</CardHighlightGameTitle>
                <p className='description'>{description}</p>
                <CategoryLabelWrapper className='category-label-wrapper'>
                    {categories.map((category) => (
                        <CategoryLabel key={category.id} color={category.color}>
                            {category.title}
                        </CategoryLabel>
                    ))}
                </CategoryLabelWrapper>
                <CardHighlightGameCreatedBy className='created-by-label-wrapper'>
                    <CreatedByLabel>Criado Por</CreatedByLabel>
                    <CreatedByName>@{createdByNickname}</CreatedByName>
                </CardHighlightGameCreatedBy>
            </CardHighlightGameContentWrapper>
            <PlayButtonWrapper className='button-wrapper'>
                <Button href={GAME_DESCRIPTION + '/' + id}>Jogar</Button>
            </PlayButtonWrapper>
        </CardHighlightGameWrapper>
    );
};

export default CardHighlightGame;

