import { describe, expect, it } from "vitest";
import { Board } from "../Board.js";
import { hirateSquares } from "../hirateSquares.js";
import type { Position } from "../../types/algebraic.types.js";
import { centerBishopSquares } from "../__mock__/centerBishopSquares.js";
import { centerBishop_fourLancesSquares } from "../__mock__/centerBishop-fourLancesSquares.js";
import { MovementError } from "../../../errors/movement.errors.js";
import { ShogiPiece, ShogiPieceNormal } from "../../Piece/Piece.js";
import { emptyHands } from "../../Hand/__mock__/emptyHands.js";
import { fullHands } from "../../Hand/__mock__/fullHands.js";


describe("座標エラーの確認", () => {
  it ("盤外には移動できない", () => {
    const board = new Board(hirateSquares, fullHands);

    const invalidPosList: Position[] = [
      { x: 0, y: -1 },
      { x: 9, y: 5 },
      { x: 9, y: -1 }
    ];

    invalidPosList.forEach(pos => {
      expect(
        () => board.movePiece({ x: 8, y: 8 }, pos, false)
      ).toThrow(MovementError);
    })
  })

  it ("盤外には持ち駒を打てない", () => {
    const board = new Board(hirateSquares, fullHands);

    const invalidPosList: Position[] = [
      { x: 0, y: -1 },
      { x: 9, y: 5 },
      { x: 9, y: -1 }
    ];

    invalidPosList.forEach(pos => {
      expect(
        () => board.dropPiece(pos, new ShogiPieceNormal("Sente", "Gold"))
      ).toThrow(MovementError);
    })
  })

  it ("盤の端を誤ってエラーにしない", () => {
    const board = new Board(centerBishopSquares, fullHands);

    const invalidPosList: Position[] = [
      { x: 0, y: 0 },
      { x: 0, y: 8 },
      { x: 8, y: 0 },
      { x: 8, y: 8 }
    ];

    invalidPosList.forEach(pos => {
      expect(
        board.movePiece({ x: 4, y: 4 }, pos, false)
      ).toBeInstanceOf(Board);
    })
  })
})




describe("駒の重複を防止", () => {
  it ("味方の駒がいる場所には動けない", () => {
    const board = new Board(centerBishop_fourLancesSquares, fullHands);

    const invalidPosList = [
      { x: 0, y: 8 },
      { x: 8, y: 8 }
    ]

    invalidPosList.forEach(pos => {
      expect(
        () => board.movePiece({ x: 4, y: 4 }, pos, false)
      ).toThrow(MovementError);
    })
  })

  it ("相手の駒がいる場所には動くことが出来る", () => {
    const board = new Board(centerBishop_fourLancesSquares, fullHands);

    const invalidPosList = [
      { x: 0, y: 0 },
      { x: 8, y: 0 }
    ]

    invalidPosList.forEach(pos => {
      expect(
        board.movePiece({ x: 4, y: 4 }, pos, false)
      ).toBeInstanceOf(Board);
    })
  })

  it ("駒がある場所には持ち駒を打てない", () => {
    const board = new Board(hirateSquares, fullHands);

    const invalidPosList = [
      { x: 0, y: 0 },
      { x: 6, y: 6 },
      { x: 3, y: 8 }
    ]

    invalidPosList.forEach(pos => {
      expect(
        () => board.dropPiece(pos, new ShogiPieceNormal("Sente", "Gold"))
      ).toThrow(MovementError);
    })
  });

  it ("駒がない場所には持ち駒を打てる", () => {
    const board = new Board(hirateSquares, fullHands);

    console.log(board.hands.pieceRecord);

    const validPosList = [
      { x: 0, y: 1 },
      { x: 4, y: 4 },
      { x: 3, y: 7 }
    ]

    validPosList.forEach(pos => {
      expect(
        board.dropPiece(pos, new ShogiPieceNormal("Sente", "Gold"))
      ).toBeInstanceOf(Board);
    })
  });
})
