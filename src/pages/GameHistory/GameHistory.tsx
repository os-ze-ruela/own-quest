import React from 'react';
import { useContext, useState, useEffect } from "react";
import CustomizedTimeline from '../../components/GameTimeline/GameTimeline';
import HeaderLogged from '../../components/Header/HeaderLogged';
import { AuthContext } from '../../contexts/auth';
import { GameHistoryDate, GameHistoryStyle, HistoryName, Title, TitleWrap } from '../../styles/GameHistory';

function GameHistory() {
    const { user } = useContext(AuthContext);


  return (
    <>
    <HeaderLogged nickname={user!.nickname} photo={user!.photo} />
    <GameHistoryStyle>
        <TitleWrap><Title>Histórico de</Title><HistoryName>História Legal</HistoryName></TitleWrap>
        <GameHistoryDate>Iniciado em: 23/06/2023</GameHistoryDate>
        <CustomizedTimeline />
    </GameHistoryStyle>
    </>
  );
}

export default GameHistory;
