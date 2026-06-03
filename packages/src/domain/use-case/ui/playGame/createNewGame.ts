import { GameState } from "../../../entities/GameState/GameState.js";
import { handicapSchema, type Handicap } from "../../../entities/handicap.types.js";
import type { GameHistory } from "../../types/gameHistory.types.js";


type Methods = Record<"hirate" | Handicap, () => GameHistory>;


const handicaps = handicapSchema.options.map(handicap => {
  return {
    [handicap]: () => {
      return {
        gameEndStatus: {
          ended: false
        },
        history: [GameState.init[handicap]]
      }
    }
  }
}) as unknown as Pick<Methods, Handicap>;


export const createNewGame: Methods = {
  hirate: (): GameHistory => {
    return {
      gameEndStatus: {
        ended: false
      },
      history: [GameState.init.hirate()]
    }
  },

  ...handicaps
}
