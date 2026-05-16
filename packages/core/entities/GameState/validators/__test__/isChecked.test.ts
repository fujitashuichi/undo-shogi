import { describe, expect, it } from "vitest";
import { Board } from "../../../Board/Board.js";
import { hirateSquares } from "../../../Board/hirateSquares.js";
import { checkedSquares } from "../__mock__/checkedSquare.js";
import { isChecked } from "../checkmate/isChecked.js";

describe("isChecked", () => {
  it("王手でない状態を正しく判定する", () => {
    const board = new Board(hirateSquares);

    expect(isChecked(board, "Sente")).toBe(
      false
    );
    expect(isChecked(board, "Gote")).toBe(
      false
    );

    const checkedBoard = new Board(checkedSquares);
    expect(isChecked(checkedBoard, "Gote")).toBe(
      false
    );
  });

  it("王手の状態を正しく判定する", () => {
    const board = new Board(checkedSquares);

    expect(isChecked(board, "Sente")).toBe(
      true
    );
  });
});
