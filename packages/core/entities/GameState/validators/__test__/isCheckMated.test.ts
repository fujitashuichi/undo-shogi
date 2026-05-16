import { describe, expect, it } from "vitest";
import { Board } from "../../../Board/Board.js";
import { atamakinSquares } from "../__mock__/atamakinSquares.js";
import { isCheckMated } from "../checkmate/isCheckMated.js";
import { fullHands } from "../../../Hand/__mock__/fullHands.js";
import { checkedSquares } from "../__mock__/checkedSquare.js";
import { emptyHands } from "../../../Hand/__mock__/emptyHands.js";

describe("isCheckMated", () => {
  it("頭金の詰みを判定する", () => {
    const board = new Board(atamakinSquares);
    expect(
      isCheckMated(board, fullHands, "Sente")
    ).toBe(true);
  });

  it("持ち駒があっても詰みを誤検知しない", () => {
    const board = new Board(atamakinSquares);
    expect(
      isCheckMated(board, fullHands, "Sente")
    ).toBe(true);
  });

  it("詰んでいない場合に誤検知しない", () => {
    const board = new Board(checkedSquares);
    expect(
      isCheckMated(board, emptyHands, "Sente")
    ).toBe(false);
  });
});
