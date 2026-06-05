import type { Position } from "../../entities/types/algebraic.types.js";
import type { NormalPieceKind } from "../../entities/types/piece.types.js";
import { convertToDomainError, type DomainError } from "../errors/domainError.js";
import { PlayError } from "../logic/errors/playError.js";
import type { GameHistory } from "../types/gameHistory.types.js";
import { initializers } from "./initializers.js";
import { kifToShogiPlayer } from "./playGame/kifToShogiPlayer.js";
import { playGame } from "./playGame/playGame.js";


export type PlayResult =
  | { success: false, error: DomainError }
  | { success: true, shogiPlayer: ShogiPlayer }


export class ShogiPlayer {
  public readonly history: GameHistory;

  constructor (
    history: GameHistory
  ) {
    this.history = history;
  }


  public static init = {
    ...initializers,

    byKif: (kif: string): PlayResult => {
      return createPlayResultHandler(() => {
        return kifToShogiPlayer(kif)
      });
    }
  }


  public readonly movePiece = (currentPos: Position, nextPos: Position, promote: boolean): PlayResult => {
    return createPlayResultHandler(() => {
      if (this.history.gameEndStatus.ended) {
        throw new PlayError("GAME_ALREADY_ENDED");
      }

      const nextHistory = playGame(this.history).movePiece(currentPos, nextPos, promote);
      return new ShogiPlayer(nextHistory)
    });
  }


  public readonly dropPiece = (position: Position, kind: NormalPieceKind): PlayResult => {
    return createPlayResultHandler(() => {
      if (this.history.gameEndStatus.ended) {
        throw new PlayError("GAME_ALREADY_ENDED");
      }

      const nextHistory = playGame(this.history).dropPiece(position, kind);
      return new ShogiPlayer(nextHistory);
    });
  }


  public readonly undo = (): PlayResult => {
    return createPlayResultHandler(() => {
      const nextHistory = playGame(this.history).undo();
      return new ShogiPlayer(nextHistory);
    });
  }
}



export function createPlayResultHandler(
  func_nextPlayer: () => ShogiPlayer
): PlayResult {
  try {
    return {
      success: true,
      shogiPlayer: func_nextPlayer()
    }
  } catch (err) {
    return {
      success: false,
      error: convertToDomainError(err)
    }
  }
}
