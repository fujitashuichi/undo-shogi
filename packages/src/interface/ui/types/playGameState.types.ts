import type { GameState } from "../../../core/entities/GameState/GameState.js";
import type { Position } from "../../../core/entities/types/algebraic.types.js";
import type { NormalPieceKind } from "../../../core/entities/types/piece.types.js";
import type { DomainError } from "../../errors/domain.error.js";

export interface PlayGameState {
  move(gameState: GameState, currentPos: Position, nextPos: Position, promote: boolean):
    | {
      success: false,
      error: DomainError
    }
    | {
      success: true,
      nextState: GameState,
    }
  drop(gameState: GameState, position: Position, kind: NormalPieceKind):
    | {
      success: false,
      error: DomainError
    }
    | {
      success: true,
      nextState: GameState,
    }
}
