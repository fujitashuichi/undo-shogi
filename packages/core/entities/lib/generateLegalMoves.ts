import { MovementError } from "../../errors/movement.errors.js";
import type { Board } from "../Board/Board.js";
import { isChecked } from "../Board/validators/checkmate/isChecked.js";
import type { Position } from "../types/algebraic.types.js";
import type { Side } from "../types/piece.types.js";
import { positionsUnderAttack } from "./positionsUnderAttack.js";
import { searchPiecesBySide } from "./searchPiecesBySide.js";

export const generateLegalMoves = {
  byPiece: (board: Board, piecePos: Position) => {
    let legalPosList: Position[] = [];

    const underAttack = positionsUnderAttack.byPiece(board, piecePos);

    const piece = board.squares[piecePos.y]![piecePos.x];
    if (!piece) throw new MovementError("MOVE_UNDEFINED_PIECE");

    underAttack.forEach(pos => {
      // ここでは駒の位置だけが必要であるため、promote: boolean はどちらでもよい
      // 「移動したときに自殺手になっているか」を見ているため、「ならないから詰む」というのは関係がない
      try {
        board.movePiece(piecePos, pos, false);
        legalPosList.push(pos);
      } catch (err) {
        if (
          !(err instanceof MovementError && err.type === "SELF_CHECKED")
        ) {
          throw err;
        }
      }
    });

    return legalPosList;
  },

  all: (board: Board, side: Side) => {
    let legalPosList: Position[] = [];

    const piecesPos = searchPiecesBySide.returnPositions(board, side);

    piecesPos.forEach(pos => {
      legalPosList.push(
        ...generateLegalMoves.byPiece(board, pos)
      );
    })


    // 重複排除
    const uniqueMap = new Map(legalPosList.map(p => [`${p.x},${p.y}`, p]));
    return [...uniqueMap.values()];
  }
}
