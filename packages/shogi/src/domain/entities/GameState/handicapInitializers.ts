import { handicapSchema, type Handicap } from "@/schemas/primitive/handicap.js";
import { GameState } from "./GameState.js";
import { Board } from "../Board/Board.js";
import { Hands } from "../Hands/Hands.js";


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
