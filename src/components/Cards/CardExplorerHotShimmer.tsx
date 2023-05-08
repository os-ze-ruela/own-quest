import { Skeleton } from '@mui/material';
import React from 'react';
import { CardMostViewGameContentWrapper, CardMostViewGameImageSpace, CardMostViewGameWrapper } from '../../styles/Explorer';

export const CardExplorerHotShimmer: React.FC = () => (
    <CardMostViewGameWrapper>
        <CardMostViewGameImageSpace>
            <Skeleton
                variant="rounded"
                animation="wave"
                width='100%'
                height='200px' />
        </CardMostViewGameImageSpace>
        <CardMostViewGameContentWrapper>
            <Skeleton variant="rounded" animation="wave" width='50%' height='25px' />
            <Skeleton variant="rounded" animation="wave" width='70%' height='15px' style={{ marginTop: '1rem' }} />
        </CardMostViewGameContentWrapper>
    </CardMostViewGameWrapper>
);