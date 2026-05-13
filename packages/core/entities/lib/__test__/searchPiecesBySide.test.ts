import { describe, expect, it } from "vitest";
import { Board } from "../../Board/Board.js";
import { hirateSquares } from "../../Board/hirateSquares.js";
import { searchPiecesBySide } from "../searchPiecesBySide.js";

describe("lib/searchPiecesBySide", () => {
  describe("先手の駒を全て取得する", () => {
    it ("returnPositionsの場合", () => {
      const board = new Board(hirateSquares);

      let expected = [];
      for (let i = 0; i < 9; i++) {
        expected.push({ x: i, y: 6 }, { x: i, y: 8 });
      }
      expected.push({ x: 1, y: 7 }, { x: 7, y: 7 });

      expect(searchPiecesBySide.returnPositions(board, "Sente")).toEqual(
        expect.arrayContaining(expected)
      );

      expect(expected).toEqual(
        expect.arrayContaining(searchPiecesBySide.returnPositions(board, "Sente"))
      );
    });

    it ("returnInstancesの場合", () => {
      const board = new Board(hirateSquares);

      expect(
        searchPiecesBySide.returnInstances(board, "Sente")
      ).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ kind: "King", side: "Sente" }),
          expect.objectContaining({ kind: "Gold", side: "Sente" }),
          expect.objectContaining({ kind: "Silver", side: "Sente" }),
          expect.objectContaining({ kind: "Knight", side: "Sente" }),
          expect.objectContaining({ kind: "Lance", side: "Sente" }),
          expect.objectContaining({ kind: "Bishop", side: "Sente" }),
          expect.objectContaining({ kind: "Rook", side: "Sente" }),
          expect.objectContaining({ kind: "Pawn", side: "Sente" })
        ])
      )
    });
  });

  describe("後手の駒を全て取得する", () => {
    it ("returnPositionsの場合", () => {
      const board = new Board(hirateSquares);

      let expected = [];
      for (let i = 0; i < 9; i++) {
        expected.push({ x: i, y: 0 }, { x: i, y: 2 });
      }
      expected.push({ x: 1, y: 1 }, { x: 7, y: 1 });

      expect(searchPiecesBySide.returnPositions(board, "Gote")).toEqual(
        expect.arrayContaining(expected)
      );

      expect(expected).toEqual(
        expect.arrayContaining(searchPiecesBySide.returnPositions(board, "Gote"))
      );
    });

    it ("returnInstancesの場合", () => {
      const board = new Board(hirateSquares);

      expect(
        searchPiecesBySide.returnInstances(board, "Sente")
      ).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ kind: "King" }),
          expect.objectContaining({ kind: "Gold" }),
          expect.objectContaining({ kind: "Silver" }),
          expect.objectContaining({ kind: "Knight" }),
          expect.objectContaining({ kind: "Lance" }),
          expect.objectContaining({ kind: "Bishop" }),
          expect.objectContaining({ kind: "Rook" }),
          expect.objectContaining({ kind: "Pawn" })
        ])
      )
    });
  });
});
