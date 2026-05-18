import { describe, expect, it } from "vitest";
import { GameState } from "../GameState.js";
import { Board } from "../../Board/Board.js";
import { hirateSquares } from "../../Board/hirateSquares.js";
import { emptyHands } from "../../Hand/__mock__/emptyHands.js";
import { fullHands } from "../../Hand/__mock__/fullHands.js";

describe("GameBoard", () => {
  it("駒を動かした際に手番が移る", () => {
    const board = new Board(hirateSquares);
    const gameState = new GameState(board, emptyHands);

    const nextState = gameState.movePiece({ x: 2, y: 6 }, { x: 2, y: 5 }, false);
    expect(
      nextState.currentSide
    ).toBe("Gote");
  })

  it("持ち駒を打った際に手番が移る", () => {
    const board = new Board(hirateSquares);
    const gameState = new GameState(board, fullHands);

    const nextState = gameState.dropPiece({ x: 4, y: 4 }, "Gold");
    expect(
      nextState.currentSide
    ).toBe("Gote");
  })
});
