
import { useContext } from "react";
import { GameContext } from "../../../contexts/game";
import { GAME_HISTORY } from "../../../core/app-urls";
import {
    ButtonHist,
    CardGame,
    CardInfos,
    CardStatusInfos,
    CardSubInfos,
    CardTitle,
    HistoricTitle,
    WrapCardGame
} from "../../../styles/Profile";

export default function HistoricOfGamesTab() {


    const { userPlayingAllGames } =
        useContext(GameContext);

    return (
        <WrapCardGame>
            <HistoricTitle>Histórico de Jogos</HistoricTitle>

            {userPlayingAllGames.map((listgame, index) => {
                const gameDate = new Date(listgame.game_date_play);
                const day = gameDate.getDate().toString().padStart(2, "0");
                const month = (gameDate.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                const year = gameDate.getFullYear().toString();
                const formattedDate = `${day}/${month}/${year}`;

                return (
                    <CardGame key={index}>
                        <CardInfos>
                            <CardTitle>{listgame.game.title}</CardTitle>
                            <CardSubInfos>Jogado em: {formattedDate}</CardSubInfos>
                            {/* <CardSubInfos>{listgame.game.createdBy!.name}</CardSubInfos> */}
                            <CardStatusInfos
                                status={
                                    listgame.not_possible_continue
                                        ? "Interrompido por nova versão"
                                        : listgame.is_ongoing
                                            ? "Em andamento"
                                            : "Finalizado"
                                }
                            >
                                {listgame.not_possible_continue
                                    ? "Interrompido por nova versão"
                                    : listgame.is_ongoing
                                        ? "Em andamento"
                                        : "Finalizado"}
                            </CardStatusInfos>
                        </CardInfos>
                        <ButtonHist href={GAME_HISTORY + '/' + listgame.play_game_id} >Ver Histórico</ButtonHist>
                    </CardGame>
                );
            })}
        </WrapCardGame>
    );
}