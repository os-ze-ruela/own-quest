import { Skeleton } from '@mui/material';
import React from 'react';
import { CardHighlightGameContentWrapper, CardHighlightGameImageSpace, CardHighlightGameWrapper } from '../../styles/components/CardHighlightGame';

export const CardHighlightGameShimmer: React.FC = () => (
    <CardHighlightGameWrapper>
        <CardHighlightGameImageSpace>
            <Skeleton
                variant="rounded"
                animation="wave"
                width='100%'
                height='200px' />
        </CardHighlightGameImageSpace>
        <CardHighlightGameContentWrapper>
            <Skeleton variant="rounded" animation="wave" width='50%' height='25px' />
            <Skeleton variant="rounded" animation="wave" width='70%' height='15px' style={{ marginTop: '1rem' }} />
        </CardHighlightGameContentWrapper>
    </CardHighlightGameWrapper>
);