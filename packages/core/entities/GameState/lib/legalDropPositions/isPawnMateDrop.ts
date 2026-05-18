import type { Board } from "../../../Board/Board.js";
import type { Hands } from "../../../Hand/Hands.js";
import { ShogiPieceNormal } from "../../../Piece/Piece.js";
import type { Position } from "../../../types/algebraic.types.js";
import type { NormalPieceKind, Side } from "../../../types/piece.types.js";
import { isChecked } from "../../validators/checkmate/isChecked.js";
import { legalDropPositions_IgnoreDropPawnMate } from "./ignoreDropPawnMate.js";
import { legalMovePositions } from "../legalMovePositions/legalMovePositions.js";


export const isPawnMateDrop = (board: Board, hands: Hands, side: Side, position: Position, pieceKind: NormalPieceKind): boolean => {
  if (pieceKind === "Pawn") {
    const nextBoard = board.dropPiece(position, new ShogiPieceNormal(side, pieceKind));
    const nextHands = hands.takePiece(side, pieceKind);
    const opponentSide = side === "Sente" ? "Gote" : "Sente";

    if (!isChecked(nextBoard, opponentSide)) return false;

    const hasOpponentMoves = legalMovePositions.all(nextBoard, opponentSide).length > 0;

    // こちらから王手で歩を打った時に相手からDropPawnMateを打つことは不可能なため、IgnoreDropPawnMateを使って成立する
    const hasOpponentDrops = legalDropPositions_IgnoreDropPawnMate.all(nextBoard, nextHands, opponentSide).length > 0;

    if (!hasOpponentMoves && !hasOpponentDrops) {
      return true;
    }
  }

  return false;
}
