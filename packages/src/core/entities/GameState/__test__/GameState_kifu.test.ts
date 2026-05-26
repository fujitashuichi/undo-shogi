import { describe, expect, it } from "vitest";
import { GameState } from "../GameState.js";
import { Board } from "../../Board/Board.js";
import { hirateSquares } from "../../Board/hirateSquares.js";
import { emptyHands } from "../../Hand/__mock__/emptyHands.js";

describe("終局まで通した検証", () => {
  it("馬と角で詰ます手順", () => {
    const gameState = new GameState(
      new Board(hirateSquares),
      emptyHands
    );

    const checkmateGameState = gameState
      .movePiece({ x: 2, y: 6 }, { x: 2, y: 5 }, false)
      .movePiece({ x: 6, y: 2 }, { x: 6, y: 3 }, false)
      .movePiece({ x: 1, y: 7 }, { x: 7, y: 1 }, true)
      .movePiece({ x: 5, y: 0 }, { x: 4, y: 1 }, false)
      .dropPiece({ x: 5, y: 1 }, "Bishop")
      .movePiece({ x: 4, y: 0 }, { x: 5, y: 0 }, false)
      .movePiece({ x: 7, y: 1 }, { x: 6, y: 0 }, false)

    expect(checkmateGameState.checkMated).toBe("Gote");
  });

  it("角と金で詰ます手順", () => {
    const gameState = new GameState(
      new Board(hirateSquares),
      emptyHands
    );

    const checkmateGameState = gameState
      .movePiece({ x: 2, y: 6 }, { x: 2, y: 5 }, false)
      .movePiece({ x: 4, y: 0 }, { x: 4, y: 1 }, false)
      .movePiece({ x: 1, y: 7 }, { x: 6, y: 2 }, false) // 角不成
      .movePiece({ x: 3, y: 0 }, { x: 4, y: 0 }, false)
      .movePiece({ x: 6, y: 2 }, { x: 4, y: 0 }, false) // 角不成
      .movePiece({ x: 2, y: 0 }, { x: 2, y: 1 }, false)
      .dropPiece({ x: 3, y: 1 }, "Gold")

    expect(checkmateGameState.checkMated).toBe("Gote");
  });
});
