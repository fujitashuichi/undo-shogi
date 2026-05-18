import type { Board } from "../../../Board/Board.js";
import type { Hands } from "../../../Hand/Hands.js";
import { ShogiPieceNormal } from "../../../Piece/Piece.js";
import type { Position } from "../../../types/algebraic.types.js";
import type { NormalPieceKind, Side } from "../../../types/piece.types.js";
import { isChecked } from "../../validators/checkmate/isChecked.js";
import { legalDropPositions_IgnorePawnMate } from "../legalMovePositions/ignorePawnMate.js";
import { legalMovePositions } from "../legalMovePositions/legalMovePositions.js";


export const isPawnMateDrop = (board: Board, hands: Hands, side: Side, position: Position, pieceKind: NormalPieceKind): boolean => {
  if (pieceKind === "Pawn") {
    const nextBoard = board.dropPiece(position, new ShogiPieceNormal(side, pieceKind));
    const nextHands = hands.takePiece(side, pieceKind);
    const opponentSide = side === "Sente" ? "Gote" : "Sente";

    if (!isChecked(nextBoard, opponentSide)) return false;

    const hasOpponentMoves = legalMovePositions.all(nextBoard, opponentSide).length > 0;

    // ではない場合を検知すると「最後の審判」という詰み問題になり、これは将棋連盟公式にも規定がない
    // これは一般に起こることがまずなく、循環参照を防ぐためにも実装を避ける
    const hasOpponentDrops = legalDropPositions_IgnorePawnMate.all(nextBoard, nextHands, opponentSide).length > 0;

    if (!hasOpponentMoves && !hasOpponentDrops) {
      return true;
    }
  }

  return false;
}
