import { GameState } from "../../../entities/GameState/GameState.js";
import type { GameHistory } from "../../types/gameHistory.types.js";

export const createNewGame = {
  hirate: (): GameHistory => {
    return {
      gameEndStatus: {
        ended: false
      },
      history: [GameState.init.hirate()]
    }
  }
}
