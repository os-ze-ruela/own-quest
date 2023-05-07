import { Skeleton } from '@mui/material';
import React from 'react';
import { CardContentWrapper, CardWrapperCard, ImageSpace } from '../../styles/HomeLogged';

export const CardHomeShimmer: React.FC = () => (
  <CardWrapperCard>
    <ImageSpace>
      <Skeleton variant="rounded" animation="wave" width='100%' height='120px' style={{ marginTop: '1rem', marginLeft: '1rem' }} />
    </ImageSpace>
    <CardContentWrapper>
      <Skeleton variant="rounded" animation="wave" width='50%' height='25px' style={{ marginTop: '1rem' }} />
      <Skeleton variant="rounded" animation="wave" width='70%' height='15px' style={{ marginTop: '1rem' }} />
    </CardContentWrapper>
  </CardWrapperCard>
);