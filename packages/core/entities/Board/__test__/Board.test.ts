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
});
