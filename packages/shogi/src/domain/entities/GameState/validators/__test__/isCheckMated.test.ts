import { describe, expect, it } from "vitest";
import { Board } from "../../../Board/Board.js";
import { atamakinSquares } from "../__mock__/atamakinSquares.js";
import { isCheckMated } from "../checkmate/isCheckMated.js";
import { checkedSquares } from "../__mock__/checkedSquare.js";
import { Hands } from "../../../Hand/Hands.js";

describe("isCheckMated", () => {
  it("頭金の詰みを判定する", () => {
    const board = new Board(atamakinSquares);
    expect(
      isCheckMated(board, Hands.init.full(), "Sente")
    ).toBe(true);
  });

  it("持ち駒があっても詰みは詰みと判定される", () => {
    const board = new Board(atamakinSquares);
    expect(
      isCheckMated(board, Hands.init.full(), "Sente")
    ).toBe(true);
  });

  it("王手されても詰んでいない場合に誤検知しない", () => {
    const board = new Board(checkedSquares);
    expect(
      isCheckMated(board, Hands.init.full(), "Sente")
    ).toBe(false);
  });
});
