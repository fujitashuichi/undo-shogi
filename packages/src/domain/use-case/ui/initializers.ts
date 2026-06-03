import { handicapSchema, type Handicap } from "../../entities/handicap.types.js";
import { createNewGame } from "./playGame/createNewGame.js";
import { createPlayResultHandler, ShogiPlayer, type PlayResult } from "./ShogiPlayer.js";


const handicapInitializers = handicapSchema.options.map((handicap) => {
  return {
    [handicap]: (): PlayResult => {
      return createPlayResultHandler(() => {
        return new ShogiPlayer(
          createNewGame[handicap]()
        )
      });
    }
  }
}) as unknown as Record<Handicap, () => PlayResult>


export const initializers = {
  hirate: (): PlayResult => {
    return createPlayResultHandler(() => {
      return new ShogiPlayer(
        createNewGame.hirate()
      )
    });
  },

  ...handicapInitializers
}
