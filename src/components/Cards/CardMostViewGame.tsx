    import React from 'react';
import Category from '../../models/Category';
import { CardMostViewGameContentWrapper, CardMostViewGameCreatedBy, CardMostViewGameImage, CardMostViewGameImageSpace, CardMostViewGameTitle, CardMostViewGameWrapper, CreatedByLabel, CreatedByName, PlayButtonWrapper } from '../../styles/Explorer';
import { Button, CategoryLabel, CategoryLabelWrapper } from '../../styles/HomeLogged';

    type CardMostViewGameProps = {
        imageSrc: string;
        title: string;
        description: string;
        categories: Category[];
        createdByNickname: string;
    };

    const CardMostViewGame: React.FC<CardMostViewGameProps> = ({ imageSrc, title, description, categories, createdByNickname }) => {

        return (
            <CardMostViewGameWrapper >
                <CardMostViewGameImageSpace>
                    <CardMostViewGameImage src={imageSrc} alt={title} />
                </CardMostViewGameImageSpace>
                <CardMostViewGameContentWrapper>
                    <CardMostViewGameTitle id={title} >{title}</CardMostViewGameTitle>
                    <p className='description'>{description}</p>
                    <CategoryLabelWrapper className='category-label-wrapper'>
                        {categories.map((category) => (
                            <CategoryLabel key={category.id} color={category.color}>
                                {category.title}
                            </CategoryLabel>
                        ))}
                    </CategoryLabelWrapper>
                    <CardMostViewGameCreatedBy className='created-by-label-wrapper'>
                        <CreatedByLabel>Criado Por</CreatedByLabel>
                        <CreatedByName>@{createdByNickname}</CreatedByName>
                    </CardMostViewGameCreatedBy>
                </CardMostViewGameContentWrapper>
                <PlayButtonWrapper className='button-wrapper'>
                    <Button href=''>Jogar</Button>
                </PlayButtonWrapper>
            </CardMostViewGameWrapper>
        );
    };

    export default CardMostViewGame;

