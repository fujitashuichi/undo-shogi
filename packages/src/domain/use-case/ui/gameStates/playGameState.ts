import type { GameState } from "../../../entities/GameState/GameState.js";
import type { Position } from "../../../entities/types/algebraic.types.js";
import type { NormalPieceKind } from "../../../entities/types/piece.types.js";
import { convertToDomainError } from "../../errors/domain.error.js";
import type { PlayGameState } from "../types/playGameState.types.js";

export const playGameState: PlayGameState = {
  move: (gameState: GameState, currentPos: Position, nextPos: Position, promote: boolean) => {
    try {
      const nextState = gameState.movePiece(currentPos, nextPos, promote);
      return {
        success: true,
        nextState
      }
    } catch (err) {
      return {
        success: false,
        error: convertToDomainError(err)
      }
    }
  },

  drop: (gameState: GameState, position: Position, kind: NormalPieceKind) => {
    try {
      const nextState = gameState.dropPiece(position, kind);
      return {
        success: true,
        nextState
      }
    } catch (err) {
      return {
        success: false,
        error: convertToDomainError(err)
      }
    }
  }
}
