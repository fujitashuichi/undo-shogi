import type { Board } from "../../Board/Board.js";
import type { Position } from "../../types/algebraic.types.js";
import type { Side } from "../../types/piece.types.js";
import { searchPiecesBySide } from "../../lib/searchPiecesBySide.js";
import { positionsUnderAttack } from "../../lib/positions/positionsUnderAttack/positionsUnderAttack.js";
import { isChecked } from "../validators/checkmate/isChecked.js";
import { MovementError } from "../../../errors/movement.errors.js";

export const legalMovePositions = {
  byPiece: (board: Board, piecePos: Position) => {
    let legalPosList: Position[] = [];

    const piece = board.squares[piecePos.y]![piecePos.x];
    if (!piece) throw new MovementError("MOVE_UNDEFINED_PIECE");

    const underAttack = positionsUnderAttack.byPiece(board, piecePos);

    underAttack.forEach(pos => {
      // ここでは駒の位置だけが必要であるため、promote: boolean はどちらでもよい
      // 「移動したときに自殺手になっているか」を見ているため、「成らないから詰む」というのはここで調べることではない
      try {
        const checked = isChecked(board.movePiece(piecePos, pos, false), piece.side);
        if (!checked) {
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
