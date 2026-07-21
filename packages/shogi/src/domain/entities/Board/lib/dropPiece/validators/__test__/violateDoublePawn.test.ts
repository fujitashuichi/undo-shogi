import { describe, expect, it } from "vitest";
import { Board } from "../../../../Board.js";
import { ShogiPieceNormal } from "../../../../../Piece/Piece.js";
import { ShogiRulesError } from "../../../../../errors/shogiRules.error.js";
import type { Position } from "@/schemas/primitive/algebraic.js";

describe("将棋のルール", () => {
  it("2歩を禁止する", () => {
    const board = Board.init.hirate();

    const invalidPosList: Position[] = [
      { x: 5, y: 4 },
      { x: 4, y: 1 },
      { x: 0, y: 7 }
    ];

    invalidPosList.forEach(pos => {
      expect(
        () => board.dropPiece(pos, new ShogiPieceNormal("Sente", "Pawn"))
      ).toThrow(ShogiRulesError);
    });
  });
});
