import React from 'react';
import { ButtonWrapper, CardContentWrapper, CardWrapperCard, CategoryLabelWrapper, ImageSpace } from '../../styles/HomeLogged';

export const LoadingCard: React.FC = () => (
  <CardWrapperCard>
    <ImageSpace>
      <div className="shimmer" style={{ height: '150px', width: '100%', marginTop: '1rem', marginLeft: '1rem'}} />
    </ImageSpace>
    <CardContentWrapper>
      <div className="shimmer" style={{ height: '25px', width: '50%', marginTop: '1rem' }} />
      <div className="shimmer" style={{ height: '15px', width: '70%', marginTop: '1rem' }} />
      <CategoryLabelWrapper>
        <div className="shimmer" style={{ height: '20px', width: '30%', marginTop: '1rem' }} />
        <div className="shimmer" style={{ height: '20px', width: '30%', marginTop: '1rem' }} />
      </CategoryLabelWrapper>
      <ButtonWrapper>
        <div className="shimmer" style={{ height: '40px', width: '80px', marginTop: '1rem' }} />
      </ButtonWrapper>
    </CardContentWrapper>
  </CardWrapperCard>
);