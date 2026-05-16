import { describe, expect, it } from "vitest";
import { checkmateValidator } from "../checkmate/checkmateValidator.js";
import { Board } from "../../../Board/Board.js";
import { hirateSquares } from "../../../Board/hirateSquares.js";
import { checkedSquares } from "../__mock__/checkedSquare.js";
import { atamakinSquares } from "../__mock__/atamakinSquares.js";
import { emptyHands } from "../../../Hand/__mock__/emptyHands.js";
import { fullHands } from "../../../Hand/__mock__/fullHands.js";

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

  describe("isCheckMated", () => {
    it("頭金の詰みを判定する", () => {
      const board = new Board(atamakinSquares);
      expect(
        checkmateValidator.isCheckMated(board, fullHands, "Sente")
      ).toBe(true);
    });

    it("持ち駒があっても詰みを誤検知しない", () => {
      const board = new Board(atamakinSquares);
      expect(
        checkmateValidator.isCheckMated(board, fullHands, "Sente")
      ).toBe(true);
    });

    it("詰んでいない場合に誤検知しない", () => {
      const board = new Board(checkedSquares);
      expect(
        checkmateValidator.isCheckMated(board, emptyHands, "Sente")
      ).toBe(false);
    });
  });
});
