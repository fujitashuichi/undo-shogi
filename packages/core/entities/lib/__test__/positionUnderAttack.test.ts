import { describe, expect, it } from "vitest";
import { positionsUnderAttack } from "../positionsUnderAttack.js";
import { Board } from "../../Board/Board.js";
import { hirateSquares } from "../../Board/hirateSquares.js";

describe("lib/positionsUnderAttack", () => {
  describe("駒単体の効きを正しく補足する", () => {
    const board = new Board(hirateSquares);

    it("先手桂馬の例", () => {
      expect(
        positionsUnderAttack.byPiece(board, { x: 1, y: 8 })
      ).toStrictEqual([]);
      expect([]).toStrictEqual(
        positionsUnderAttack.byPiece(board, { x: 1, y: 8 })
      );
    });


    it("後手飛車の例", () => {
      const expected = [
        { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }
      ]

      expect(positionsUnderAttack.byPiece(board, { x: 1, y: 1 })).toEqual(
        expect.arrayContaining(expected)
      );
      expect(expected).toEqual(
        expect.arrayContaining(
          positionsUnderAttack.byPiece(board, { x: 1, y: 1 })
        )
      );
    });

    it("先手玉の例", () => {
      const expected = [
        { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }
      ]

      expect(positionsUnderAttack.byPiece(board, { x: 4, y: 8 })).toEqual(
        expect.arrayContaining(expected)
      );
      expect(expected).toEqual(
        expect.arrayContaining(
          positionsUnderAttack.byPiece(board, { x: 4, y: 8 })
        )
      );
    });
  });
});