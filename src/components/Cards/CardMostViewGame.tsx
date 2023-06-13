    import React from 'react';
import { CREATOR, GAME_DESCRIPTION } from '../../core/app-urls';
import Category from '../../models/Category';
import { CardMostViewGameContentWrapper, CardMostViewGameCreatedBy, CardMostViewGameImage, CardMostViewGameImageSpace, CardMostViewGameTitle, CardMostViewGameWrapper, CreatedByLabel, CreatedByName, PlayButtonWrapper } from '../../styles/Explorer';
import { Button, CategoryLabel, CategoryLabelWrapper } from '../../styles/HomeLogged';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';

    type CardMostViewGameProps = {
        id: number;
        imageSrc: string;
        title: string;
        description: string;
        categories: Category[];
        createdByNickname: string;
    };

    const CardMostViewGame: React.FC<CardMostViewGameProps> = ({ id, imageSrc, title, description, categories, createdByNickname }) => {

        return (
            <CardMostViewGameWrapper href={GAME_DESCRIPTION + '/' + id}>
                <CardMostViewGameImageSpace>
                {imageSrc ? 
                <CardMostViewGameImage src={imageSrc} alt={title} />

                :
                <ImagePlaceholder/>
                }
                </CardMostViewGameImageSpace>
                <CardMostViewGameContentWrapper>
                    <CardMostViewGameTitle id={title} >{title}</CardMostViewGameTitle>
                    <p className='description' title={description}>{description}</p>
                    <CategoryLabelWrapper className='category-label-wrapper'>
                        {categories.map((category) => (
                            <CategoryLabel key={category.id} color={category.color}>
                                {category.title}
                            </CategoryLabel>
                        ))}
                    </CategoryLabelWrapper>
                    <CardMostViewGameCreatedBy className='created-by-label-wrapper'>
                        <CreatedByLabel>Criado Por</CreatedByLabel>
                        <CreatedByName href={CREATOR + '/' + createdByNickname} >@{createdByNickname}</CreatedByName>
                    </CardMostViewGameCreatedBy>
                </CardMostViewGameContentWrapper>
                <PlayButtonWrapper className='button-wrapper'>
                    <Button href={GAME_DESCRIPTION + '/' + id}>Jogar</Button>
                </PlayButtonWrapper>
            </CardMostViewGameWrapper>
        );
    };

    export default CardMostViewGame;

