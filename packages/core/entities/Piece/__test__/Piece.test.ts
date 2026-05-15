import { describe, expect, it } from "vitest";
import { pieceMotionValidator } from "../validators/motionValidator.js";
import { Board } from "../../Board/Board.js";
import { hirateSquares } from "../../Board/hirateSquares.js";
import { PieceError } from "../../../errors/piece.error.js";
import type { Position } from "../../types/algebraic.types.js";

describe("pieceMotionVector", () => {
  it("他の駒を追い越せない", () => {
    const board = new Board(hirateSquares);

    const invalidPosList: Position[] = [
      { x: 7, y: 4 },
      { x: 0, y: 7 }
    ];

    invalidPosList.forEach(pos => {
      expect(
        () => pieceMotionValidator(board, { x: 7, y: 7 }, pos, false)
      ).toThrow(PieceError);
    });
  });

  it("定義されていないベクトル移動はできない", () => {
    const board = new Board(hirateSquares);

    const invalidPosList: Position[] = [
      { x: 1, y: 1 },
      { x: 5, y: 4 },
      { x: 3, y: 7 }
    ];

    invalidPosList.forEach(pos => {
      expect(
        () => pieceMotionValidator(board, { x: 1, y: 8 }, pos, false)
      ).toThrow(PieceError);
    });
  });

  it("ベクトル定義に沿った移動が可能である", () => {
    const board = new Board(hirateSquares);

    expect(
      () => pieceMotionValidator(board, { x: 7, y: 7 }, { x: 3, y: 7 }, false)
    ).not.toThrow();

    expect(
      () => pieceMotionValidator(board, { x: 4, y: 8 }, { x: 5, y: 7 }, false)
    ).not.toThrow();
  });
});
