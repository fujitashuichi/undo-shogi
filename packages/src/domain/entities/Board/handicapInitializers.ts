import { Hands } from "../Hand/Hands.js";
import type { Handicap } from "../handicap.types.js";
import { Board } from "./Board.js";
import { eightOchiSquares } from "./squares/eightOchiSquares.js";
import { fourOchiSquares } from "./squares/fourOchiSquares.js";
import { hishaOchiSquares } from "./squares/hishaOchiSquares.js";
import { kakuOchiSquares } from "./squares/kakuOchiSquares.js";
import { kyoOchiSquares } from "./squares/kyoOchiSquares.js";
import { sixOchiSquares } from "./squares/sixOchiSquares.js";
import { tenOchiSquares } from "./squares/tenOchiSquares.js";
import { twoOchiSquares } from "./squares/twoOchiSquares.js";

export const handicapInitializers: Record<Handicap, () => Board> = {
  hishaOchi: () => {
    return new Board(hishaOchiSquares)
  },

  kakuOchi: () => {
    return new Board(kakuOchiSquares)
  },

  kyoOchi: () => {
    return new Board(kyoOchiSquares)
  },

  two: () => {
    return new Board(twoOchiSquares)
  },

  four: () => {
    return new Board(fourOchiSquares)
  },

  six: () => {
    return new Board(sixOchiSquares)
  },

  eight: () => {
    return new Board(eightOchiSquares)
  },

  ten: () => {
    return new Board(tenOchiSquares)
  }
}
