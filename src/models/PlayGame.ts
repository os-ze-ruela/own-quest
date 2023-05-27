import Game from "./Game";

interface IPlayGames {
  play_game_id: number;
  not_possible_continue: boolean;
  is_ongoing: boolean;
  game_date_play: Date;
  game: Game;
}

class PlayGames implements IPlayGames {
  play_game_id: number;
  not_possible_continue: boolean;
  is_ongoing: boolean;
  game_date_play: Date;
  game: Game;

  constructor({
    play_game_id,
    not_possible_continue,
    is_ongoing,
    game_date_play,
    game,
  }: IPlayGames) {
    this.play_game_id = play_game_id;
    this.not_possible_continue = not_possible_continue;
    this.is_ongoing = is_ongoing;
    this.game_date_play = game_date_play;
    this.game = game;
  }
}

export default PlayGames;