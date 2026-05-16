import { describe, expect, it } from "vitest";
import { checkmateValidator } from "../checkmate/checkmateValidator.js";
import { emptyHands } from "../../../Hand/__mock__/emptyHands.js";
import { fullHands } from "../../../Hand/__mock__/fullHands.js";
import { Board } from "../../../Board/Board.js";
import { hirateSquares } from "../../../Board/hirateSquares.js";
import { checkedSquares } from "../../../Board/validators/__mock__/checkedSquare.js";
import { atamakinSquares } from "../../../Board/validators/__mock__/atamakinSquares.js";

describe("checkMateValidator", () => {
  describe("isChecked", () => {
    it("王手でない状態を正しく判定する", () => {
      const board = new Board(hirateSquares, emptyHands);

      expect(checkmateValidator.isChecked(board, "Sente")).toBe(
        false
      );
      expect(checkmateValidator.isChecked(board, "Gote")).toBe(
        false
      );

      const checkedBoard = new Board(checkedSquares, emptyHands);
      expect(checkmateValidator.isChecked(checkedBoard, "Gote")).toBe(
        false
      );
    });

    it("王手の状態を正しく判定する", () => {
      const board = new Board(checkedSquares, emptyHands);

      expect(checkmateValidator.isChecked(board, "Sente")).toBe(
        true
      );
    });
  });

  describe("isCheckMated", () => {
    it("頭金の詰みを判定する", () => {
      const board = new Board(atamakinSquares, emptyHands);
      expect(
        checkmateValidator.isCheckMated(board, "Sente")
      ).toBe(true);
    });

    it("持ち駒があっても詰み判定を間違えない", () => {
      const board = new Board(atamakinSquares, fullHands);
      expect(
        checkmateValidator.isCheckMated(board, "Sente")
      ).toBe(true);
    });

    it("詰んでいない場合に誤検知しない", () => {
      const board = new Board(checkedSquares, emptyHands);
      expect(
        checkmateValidator.isCheckMated(board, "Sente")
      ).toBe(false);
    });
  });
});
