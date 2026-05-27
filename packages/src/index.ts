import { LogicError } from "./core/errors/logic.error.js";
import type { MovementError } from "./core/errors/movement.errors.js";
import type { PieceError } from "./core/errors/piece.error.js";
import type { ShogiRulesError } from "./core/errors/shogiRules.error.js";

export { GameState } from "./core/entities/GameState/GameState.js"
export { Board } from "./core/entities/Board/Board.js"

export interface Errors {
  LogicError: LogicError,
  MovementError: MovementError,
  PieceError: PieceError,
  ShogiRulesError: ShogiRulesError
}
