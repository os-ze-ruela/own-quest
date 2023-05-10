import { Skeleton } from '@mui/material';
import React from 'react';
import { CardMyGameContentWrapper, CardMyGameWrapper, MyGameImageSpace } from '../../styles/MyGames';

export const CardMyGameShimmer: React.FC = () => (
    <CardMyGameWrapper>
        <MyGameImageSpace>
            <Skeleton
                variant="rounded"
                animation="wave"
                width='100%'
                height='200px' />
        </MyGameImageSpace>
        <CardMyGameContentWrapper>
            <Skeleton variant="rounded" animation="wave" width='50%' height='25px' />
            <Skeleton variant="rounded" animation="wave" width='70%' height='15px' style={{ marginTop: '1rem' }} />
        </CardMyGameContentWrapper>
    </CardMyGameWrapper>
);