import type { Position } from "../../entities/types/algebraic.types.js";
import type { NormalPieceKind } from "../../entities/types/piece.types.js";
import { convertToDomainError, type DomainError } from "../errors/domainError.js";
import { PlayError } from "../logic/errors/playError.js";
import type { GameHistory } from "../types/gameHistory.types.js";
import { createNewGame } from "./playGame/createNewGame.js";
import { playGame } from "./playGame/playGame.js";


type PlayResult =
  | { success: false, error: DomainError }
  | { success: true, nextPlayer: ShogiPlayer }


export class ShogiPlayer {
  public readonly history: GameHistory;

  constructor (
    history: GameHistory
  ) {
    this.history = history;
  }


  public static init = {
    hirate: (): PlayResult => {
      try {
        return {
          success: true,
          nextPlayer: new ShogiPlayer(
            createNewGame.hirate()
          )
        }
      } catch (err) {
        return {
          success: false,
          error: convertToDomainError(err)
        }
      }
    }
  }

  public readonly play = {
    movePiece: (currentPos: Position, nextPos: Position, promote: boolean): PlayResult => {
      try {
        if (this.history.gameEndStatus.ended) {
          throw new PlayError("GAME_ALREADY_ENDED");
        }

        const nextHistory = playGame(this.history).movePiece(currentPos, nextPos, promote);
        return {
          success: true,
          nextPlayer: new ShogiPlayer(nextHistory)
        }
      } catch (err) {
        return {
          success: false,
          error: convertToDomainError(err)
        }
      }
    },


    dropPiece: (position: Position, kind: NormalPieceKind): PlayResult => {
      try {
        if (this.history.gameEndStatus.ended) {
          throw new PlayError("GAME_ALREADY_ENDED");
        }

        const nextHistory = playGame(this.history).dropPiece(position, kind);
        return {
          success: true,
          nextPlayer: new ShogiPlayer(nextHistory)
        }
      } catch (err) {
        return {
          success: false,
          error: convertToDomainError(err)
        }
      }
    },


    undo: (): PlayResult => {
      try {
        const nextHistory = playGame(this.history).undo();

        return {
          success: true,
          nextPlayer: new ShogiPlayer(nextHistory)
        }
      } catch (err) {
        return {
          success: false,
          error: convertToDomainError(err)
        }
      }
    }
  };
}
