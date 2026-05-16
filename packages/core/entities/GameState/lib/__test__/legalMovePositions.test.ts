import { describe } from "node:test";
import { expect, it } from "vitest";
import { Board } from "../../../Board/Board.js";
import { hirateSquares } from "../../../Board/hirateSquares.js";
import { vitest_checkArray } from "../../../../../tools/vitest/checkArray.js";
import { pinnedRookSquares } from "../../../lib/__mock__/pinnedRookSquare.js";
import type { Position } from "../../../types/algebraic.types.js";
import { legalMovePositions } from "../legalMovePosition.js";


describe("generateLegalMoves", () => {
  describe(".byPiece() で、合法手を正しく取得する", () => {
    it("通常局面", () => {
      const board = new Board(hirateSquares);

      vitest_checkArray.containingEachOther(
        legalMovePositions.byPiece(board, { x: 1, y: 1 }),
        [
          { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }
        ]
      )
    });

    it("ピンされた局面（間接王手飛車）はピン駒（飛車）の有効な移動がない", () => {
      const board = new Board(pinnedRookSquares);

      expect(
        legalMovePositions.byPiece(board, { x: 3, y: 7 })
      ).toStrictEqual([]);
    });
  });


  describe(".all() で、合法手を正しく取得する", () => {
    it("通常局面", () => {
      const board = new Board(hirateSquares);

      let expected: Position[] = [];
      for (let i = 0; i < 9; i++) {
        expected.push(
          { x: i, y: 5 }
        )
      }
      expected.push({ x: 0, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 8, y: 7 });

      vitest_checkArray.containingEachOther(
        legalMovePositions.all(board, "Sente"),
        expected
      )
    });

    it("ピンされた局面（間接王手飛車）はピン駒（飛車）の有効な移動がない", () => {
      const board = new Board(pinnedRookSquares);

      const expected: Position[] = [
        { x: 3, y: 8 }, { x: 5, y: 8 }, { x: 4, y: 7 }, { x: 5, y: 7 }
      ]

      vitest_checkArray.containingEachOther(
        legalMovePositions.all(board, "Sente"),
        expected
      )
    });
  });
});
