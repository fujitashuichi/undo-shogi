import type { GameState } from "../../../entities/GameState/GameState.js";
import type { DomainError } from "../../errors/domain.error.js";

export interface CreateGameStates {
  fromKif(kif: string, initialState: GameState):
    | {
      success: false,
      error: DomainError
    }
    | {
      success: true,
      gameStates: GameState[]
    }

  hirate():
    | {
      success: false,
      error: DomainError
    }
    | {
      success: true,
      gameState: GameState
    }
}
