import { handicapSchema, type Handicap } from "../../entities/types/handicap.types.js";
import { createNewGame } from "./playGame/createNewGame.js";
import { createPlayResultHandler, ShogiPlayer, type PlayResult } from "./ShogiPlayer.js";


type Methods = Record<Handicap, () => PlayResult>;

const handicapInitializers: Methods = handicapSchema.options.reduce((acc: Methods, handicap) => {
  acc[handicap] = () => {
    return createPlayResultHandler(() => {
      return new ShogiPlayer(
        createNewGame[handicap]()
      )
    });
  }

  return acc;
}, {} as Methods);



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
