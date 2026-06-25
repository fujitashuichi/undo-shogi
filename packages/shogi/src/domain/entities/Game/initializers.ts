import { handicapSchema, type Handicap } from "../../entities/types/handicap.types.js";
import { Game } from "./Game.js";
import { createNewGame } from "./playGame/createNewGame.js";


type Methods = Record<Handicap, () => Game>;

const handicapInitializers: Methods = handicapSchema.options.reduce((acc: Methods, handicap) => {
  acc[handicap] = () => {
    return new Game(
      createNewGame[handicap]()
    )
  }

  return acc;
}, {} as Methods);



export const initializers = {
  hirate: (): Game => {
    return new Game(
      createNewGame.hirate()
    )
  },

  ...handicapInitializers
}
