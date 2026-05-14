import { describe, expect, it } from "vitest";
import { Board } from "../../Board.js";
import { hirateSquares } from "../../hirateSquares.js";
import { checkmateValidator } from "../checkmateValidator.js";
import { checkedSquares } from "../__mock__/checkedSquare.js";

describe("checkMateValidator", () => {
  describe("isChecked", () => {
    it("王手でない状態を正しく判定する", () => {
      const board = new Board(hirateSquares);

      expect(checkmateValidator.isChecked(board, "Sente")).toBe(
        false
      );
      expect(checkmateValidator.isChecked(board, "Gote")).toBe(
        false
      );

      const checkedBoard = new Board(checkedSquares);
      expect(checkmateValidator.isChecked(checkedBoard, "Gote")).toBe(
        false
      );
    });

    it("王手の状態を正しく判定する", () => {
      const board = new Board(checkedSquares);

      expect(checkmateValidator.isChecked(board, "Sente")).toBe(
        true
      );
    });
  });
});
