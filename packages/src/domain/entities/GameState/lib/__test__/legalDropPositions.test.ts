import { describe, expect, it } from "vitest";
import { Board } from "../../../Board/Board.js";
import { hirateSquares } from "../../../Board/hirateSquares.js";
import { legalDropPositions } from "../legalDropPositions/legalDropPositions.js";
import { checkedSquares } from "../../validators/__mock__/checkedSquare.js";
import type { Position } from "../../../types/algebraic.types.js";
import { longRangeCheckedSquares_Rook } from "../__mock__/longRangeCheckSquares_Rook.js";
import { longRangeCheckedSquares_Bishop } from "../__mock__/longRangeCheckSquares_Bishop.js";
import { dropPawnMateTrapSquares } from "../__mock__/dropPawnMateTrapSquares.js";
import { vitest_checkArray } from "../../../../../tools/vitest/checkArray.js";
import { Hands } from "../../../Hand/Hands.js";


describe("legalDropPositions", () => {
  describe("二歩", () => {
    it("二歩は選択肢に出ない", () => {
      const board = Board.init.hirate();

      expect(
        legalDropPositions.byPiece(board, Hands.init.full(), "Pawn", "Sente")
      ).toStrictEqual([])
    });
  });

  describe("王手関連", () => {
    it("王手放置で持ち駒を打てない", () => {
      const board = new Board(checkedSquares);

      expect(
        legalDropPositions.all(board, Hands.init.full(), "Sente")
      ).toStrictEqual([]);
    });

    describe("王手を遮る形で持ち駒を打てる", () => {
      it("飛車による王手の例", () => {
        const board = new Board(longRangeCheckedSquares_Rook);

        const expected: Position[] = [
          { x: 1, y: 8 }, { x: 2, y: 8 }, { x: 3, y: 8 }
        ];

        vitest_checkArray.containingEachOther(
          legalDropPositions.byPiece(board, Hands.init.full(), "Gold", "Sente"),
          expected
        )
      });

      it("角による王手の例", () => {
        const board = new Board(longRangeCheckedSquares_Bishop);

        const expected: Position[] = [
          { x: 1, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 7 }
        ];

        vitest_checkArray.containingEachOther(
          legalDropPositions.byPiece(board, Hands.init.full(), "Gold", "Sente"),
          expected
        )
      });
    });
  });

  describe("打ち歩詰め", () => {
    it("打ち歩詰めは選択肢に出ない", () => {
      const board = new Board(dropPawnMateTrapSquares);

      expect(
        legalDropPositions.byPiece(board, Hands.init.full(), "Pawn", "Sente")
      ).not.toContainEqual([
        { x: 8, y: 1 }
      ])
    });
  });
});
