import { Board } from "../Board/Board.js";
import { Hands } from "../Hand/Hands.js";
import { handicapSchema, type Handicap } from "../handicap.types.js";
import { GameState } from "./GameState.js";


export const handicapInitializers: Record<Handicap, () => GameState> =
  handicapSchema.options.map(handicap => {
    return {
      [handicap]: () => {
        return new GameState(
          Board.init[handicap](),
          Hands.init.empty()
        )
      }
    }
  }) as unknown as Record<Handicap, () => GameState>;
