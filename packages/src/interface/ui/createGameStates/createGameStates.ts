import type { GameState } from "../../../core/entities/GameState/GameState.js";
import { executeActions } from "../../../use-case/kif-commands/executeActions.js";
import { convertToDomainError } from "../../errors/domain.error.js";
import { kifToActions } from "../../kif-formatter/kifToActions.js";
import type { CreateGameStates } from "../types/createGameStates.types.js";

export const createGameStates: CreateGameStates = {
  fromKif: (kif: string, initialState: GameState) => {
    try {
      const actions = kifToActions(kif);
      const gameStates = executeActions(actions, initialState)

      return {
        success: true,
        gameStates
      }
    } catch (err) {
      return {
        success: false,
        error: convertToDomainError(err)
      }
    }
  }
}
