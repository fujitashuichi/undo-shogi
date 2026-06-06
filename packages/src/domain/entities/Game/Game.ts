import type { Position } from "../../entities/types/algebraic.types.js";
import type { NormalPieceKind } from "../../entities/types/piece.types.js";
import { GameError } from "../errors/game.error.js";
import type { GameState } from "../GameState/GameState.js";
import { initializers } from "./initializers.js";
import { kifToShogiPlayer } from "./playGame/kifToShogiPlayer.js";
import { playGame } from "./playGame/playGame.js";
import type { GameEndStatus } from "./types/gameHistory.types.js";


export type Status = {
  gameEndStatus: GameEndStatus,
  history: GameState[]
}


export class Game {
  public readonly status: Status;

  constructor (
    status: Status
  ) {
    this.status = status;
  }


  public static init = {
    ...initializers,

    byKif: (kif: string): Game => {
      return kifToShogiPlayer(kif)
    }
  }


  public readonly movePiece = (currentPos: Position, nextPos: Position, promote: boolean): Game => {
    if (this.status.gameEndStatus.ended) {
      throw new GameError("GAME_ALREADY_ENDED");
    }

    const nextHistory = playGame(this.status).movePiece(currentPos, nextPos, promote);
    return new Game(nextHistory)
  }


  public readonly dropPiece = (position: Position, kind: NormalPieceKind): Game => {
    if (this.status.gameEndStatus.ended) {
      throw new GameError("GAME_ALREADY_ENDED");
    }

    const nextHistory = playGame(this.status).dropPiece(position, kind);
    return new Game(nextHistory);
  }


  public readonly undo = (): Game => {
    const nextHistory = playGame(this.status).undo();
    return new Game(nextHistory);
  }
}
