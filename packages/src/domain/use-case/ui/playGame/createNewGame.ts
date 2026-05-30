import { hirateGameState } from "../../../entities/GameState/hirateGameState.js";
import type { GameHistory } from "../../types/gameHistory.types.js";

export const createNewGame = {
  hirate: (): GameHistory => {
    return {
      gameEndStatus: {
        ended: false
      },
      history: [hirateGameState]
    }
  }
}
