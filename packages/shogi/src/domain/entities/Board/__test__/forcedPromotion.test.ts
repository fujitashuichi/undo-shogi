import { describe, expect, it } from "vitest";
import { Board } from "../Board.js";
import { pawnInRowTwoSquares } from "../__mock__/pawnInRawTwoSquares.js";
import { centerKnightsSquares } from "../__mock__/centerKnightsSquares.js";
import { MovementError } from "../../errors/movementErrors.js";


describe("成り強制手のバリデーション", () => {
  describe("歩・香は敵陣一段目で成らなければいけない", () => {
    const board = new Board(pawnInRowTwoSquares);

    it("成らない場合はエラーを吐く", () => {
      for (let i = 0; i < 9; i++) {
        expect(
          () => board.movePiece({ x: i, y: 1 }, { x: i, y: 0 }, false)
        ).toThrow(MovementError);

        expect(
          () => board.movePiece({ x: i, y: 7 }, { x: i, y: 8 }, false)
        ).toThrow(MovementError);
      }
    });

    it("成った場合はエラーにならない", () => {
      for (let i = 0; i < 9; i++) {
        expect(
          board.movePiece({ x: i, y: 1 }, { x: i, y: 0 }, true)
        ).toBeInstanceOf(Board);

        expect(
          board.movePiece({ x: i, y: 7 }, { x: i, y: 8 }, true)
        ).toBeInstanceOf(Board);
      }
    });
  });


  describe("桂は敵陣二段目以内で成らなければいけない", () => {
    const board = new Board(centerKnightsSquares);

    it("成らない場合はエラーを吐く", () => {
      expect(
        () => board.movePiece({ x: 4, y: 2 }, { x: 5, y: 0 }, false)
      ).toThrow(MovementError);

      expect(
        () => board.movePiece({ x: 4, y: 3 }, { x: 3, y: 1 }, false)
      ).toThrow(MovementError);
    });

    it("成った場合はエラーにならない", () => {
      for (let i = 0; i < 9; i++) {
        expect(
          board.movePiece({ x: 4, y: 2 }, { x: 5, y: 0 }, true)
        ).toBeInstanceOf(Board);

        expect(
          board.movePiece({ x: 4, y: 3 }, { x: 3, y: 1 }, true)
        ).toBeInstanceOf(Board);
      }
    });
  });
});
