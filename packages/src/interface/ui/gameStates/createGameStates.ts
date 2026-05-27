import { hirateBoard } from "../../../core/entities/Board/hirateBoard.js";
import { GameState } from "../../../core/entities/GameState/GameState.js";
import { emptyHands } from "../../../core/entities/Hand/__mock__/emptyHands.js";
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
  },

  hirate: () => {
    try {
      const gameState = new GameState(hirateBoard, emptyHands);
      return {
        success: true,
        gameState
      }
    } catch (err) {
      return {
        success: false,
        error: convertToDomainError(err)
      }
    }
  }
}
