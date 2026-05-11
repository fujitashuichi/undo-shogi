import { describe, expect, it } from "vitest";
import { Board } from "../Board.js";
import { hirateSquares } from "../hirateSquares.js";

describe("test example", () => {
  it("3七銀が正しく設置される", () => {
    const board = new Board(hirateSquares);
    const three_nine = board.squares[8][2];

    expect(three_nine).toMatchObject({
      kind: "Silver"
    })
  })

  it("飛車先の歩が突ける", () => {
    const board = new Board(hirateSquares);

    console.log(board.debugRenderKanji());

    const nextBoard = board.movePiece({ x: 7, y: 6 }, { x: 7, y: 5 }, false);
    console.log(nextBoard.debugRenderKanji());
  })
});
