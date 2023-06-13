import { CircularProgress } from '@mui/material';
import React, { useContext, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { GameContext } from '../../contexts/game';
import { CloseButton } from '../../styles/components/Drawer';
import { ButtonDialog, DialogContainer } from '../../styles/components/dialog/DialogReportGame';
import { DescriptionInput } from './DialogRandomGame';


type DialogReportGameProps = {
    onClose: () => void;
    onCloseSuccess: () => void;
    onCloseError: () => void;
    gameId: number;
    userId: number;
};


const DialogReportGame: React.FC<DialogReportGameProps> = ({ onClose, onCloseError, onCloseSuccess, gameId, userId }) => {

    const [report, setReport] = useState('');
    const [loading, setLoading] = useState(false);
    const { reportGameById } = useContext(GameContext)

    const reportGame = async () => {
        try {
            setLoading(true)
            await reportGameById(gameId, userId, report)
            setLoading(false)
            onCloseSuccess()
        } catch (_) {
            setLoading(false)
            onCloseError()
        }
    }

    return (
        <DialogContainer>
            <CloseButton onClick={onClose}><IoMdClose size={40} /></CloseButton>
            <h3>Reportar História</h3>
            <DescriptionInput
                name="report"
                autoComplete="off"
                value={report}
                placeholder="Por qual motivo você deseja reportar essa história?"
                onChange={(event) => { setReport(event.target.value) }}
            />
            <ButtonDialog onClick={reportGame}>{loading ? <CircularProgress size={20} color="inherit" /> : 'Reportar'}</ButtonDialog>
        </DialogContainer>
    );
};

export default DialogReportGame;
