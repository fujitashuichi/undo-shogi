import type { Board } from "../Board/Board.js";
import type { Position } from "../types/algebraic.types.js";
import type { Side } from "../types/piece.types.js";
import { positionsUnderAttack } from "./positionsUnderAttack/positionsUnderAttack.js";
import { searchPiecesBySide } from "./searchPiecesBySide.js";

export const legalMovePositions = {
  byPiece: (board: Board, piecePos: Position) => {
    let legalPosList: Position[] = [];

    const underAttack = positionsUnderAttack.byPiece(board, piecePos);

    underAttack.forEach(pos => {
      // ここでは駒の位置だけが必要であるため、promote: boolean はどちらでもよい
      // 「移動したときに自殺手になっているか」を見ているため、「成らないから詰む」というのはここで調べることではない
      try {
        if (board.movePiece(piecePos, pos, false)) {
          legalPosList.push(pos);
        }
      } catch {}
    });

    return legalPosList;
  },

  all: (board: Board, side: Side) => {
    let legalPosList: Position[] = [];

    const piecesPos = searchPiecesBySide.returnPositions(board, side);

    piecesPos.forEach(pos => {
      legalPosList.push(
        ...legalMovePositions.byPiece(board, pos)
      );
    })


    // 重複排除
    const uniqueMap = new Map(legalPosList.map(p => [`${p.x},${p.y}`, p]));
    return [...uniqueMap.values()];
  }
}
