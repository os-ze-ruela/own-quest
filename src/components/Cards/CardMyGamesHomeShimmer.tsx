import { Skeleton } from '@mui/material';
import React from 'react';
import { CardUserGameContentWrapper, CardUserGameWrapper, UserGameImageSpace } from '../../styles/HomeLogged';

export const CardMyGamesHomeShimmer: React.FC = () => (
  <CardUserGameWrapper>
    <UserGameImageSpace>
      <Skeleton variant="rounded" animation="wave" width='100%' height='140px' style={{ marginTop: '1rem'}} />
    </UserGameImageSpace>
    <CardUserGameContentWrapper>
      <Skeleton variant="rounded" animation="wave" width='50%' height='25px' />
      <Skeleton variant="rounded" animation="wave" width='70%' height='15px' style={{ marginTop: '1rem' }} />
    </CardUserGameContentWrapper>
  </CardUserGameWrapper>
);