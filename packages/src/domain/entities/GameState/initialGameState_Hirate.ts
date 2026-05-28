import { Board } from "../Board/Board.js";
import { hirateSquares } from "../Board/hirateSquares.js";
import { emptyHands } from "../Hand/emptyHands.js";
import { GameState } from "./GameState.js";

export const initialGameState_Hirate = new GameState(
  new Board(hirateSquares),
  emptyHands
);
