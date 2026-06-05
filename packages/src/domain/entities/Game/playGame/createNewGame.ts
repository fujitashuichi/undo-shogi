import { GameState } from "../../../entities/GameState/GameState.js";
import { handicapSchema, type Handicap } from "../../../entities/types/handicap.types.js";
import type { GameHistory } from "../types/gameHistory.types.js";


type Methods = Record<"hirate" | Handicap, () => GameHistory>;
type HandicapMethods = Pick<Methods, Handicap>;


const handicaps: Pick<HandicapMethods, Handicap> =
  handicapSchema.options.reduce((acc: HandicapMethods, handicap) => {
    acc[handicap] = () => {
      return {
        gameEndStatus: {
          ended: false
        },
        history: [GameState.init[handicap]()]
      }
    }

      return acc;
    },
    {} as HandicapMethods
  );


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
