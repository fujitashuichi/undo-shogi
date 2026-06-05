import type { Position } from "../../entities/types/algebraic.types.js";
import type { NormalPieceKind } from "../../entities/types/piece.types.js";
import { GameError } from "../errors/game.error.js";
import { initializers } from "./initializers.js";
import { kifToShogiPlayer } from "./playGame/kifToShogiPlayer.js";
import { playGame } from "./playGame/playGame.js";
import type { GameHistory } from "./types/gameHistory.types.js";


export class Game {
  public readonly history: GameHistory;

  constructor (
    history: GameHistory
  ) {
    this.history = history;
  }


  public static init = {
    ...initializers,

    byKif: (kif: string): Game => {
      return kifToShogiPlayer(kif)
    }
  }


  public readonly movePiece = (currentPos: Position, nextPos: Position, promote: boolean): Game => {
    if (this.history.gameEndStatus.ended) {
      throw new GameError("GAME_ALREADY_ENDED");
    }

    const nextHistory = playGame(this.history).movePiece(currentPos, nextPos, promote);
    return new Game(nextHistory)
  }


  public readonly dropPiece = (position: Position, kind: NormalPieceKind): Game => {
    if (this.history.gameEndStatus.ended) {
      throw new GameError("GAME_ALREADY_ENDED");
    }

    const nextHistory = playGame(this.history).dropPiece(position, kind);
    return new Game(nextHistory);
  }


  public readonly undo = (): Game => {
    const nextHistory = playGame(this.history).undo();
    return new Game(nextHistory);
  }
}
