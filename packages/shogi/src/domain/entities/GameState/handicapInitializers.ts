import { Board } from "../Board/Board.js";
import { Hands } from "../Hand/Hands.js";
import { handicapSchema, type Handicap } from "../types/handicap.types.js";
import { GameState } from "./GameState.js";


type Methods = Record<Handicap, () => GameState>;


export const handicapInitializers: Methods =
  handicapSchema.options.reduce((acc: Methods, handicap) => {
    acc[handicap] = () => {
      return new GameState(
        Board.init[handicap](),
        Hands.init.empty()
      )
    }

    return acc;
  }, {} as Methods);
