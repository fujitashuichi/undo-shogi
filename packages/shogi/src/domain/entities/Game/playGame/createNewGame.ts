import { GameState } from "../../../entities/GameState/GameState.js";
import { handicapSchema, type Handicap } from "../../../entities/types/handicap.types.js";
import type { Game } from "../Game.js";


type Methods = Record<"hirate" | Handicap, () => Game["status"]>;
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
  hirate: (): Game["status"] => {
    return {
      gameEndStatus: {
        ended: false
      },
      history: [GameState.init.hirate()]
    }
  },

  ...handicaps
}
