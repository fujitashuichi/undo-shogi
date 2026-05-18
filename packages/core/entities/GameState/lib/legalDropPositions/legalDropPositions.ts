import type { Board } from "../../../Board/Board.js";
import type { Hands } from "../../../Hand/Hands.js";
import type { Position } from "../../../types/algebraic.types.js";
import type { NormalPieceKind, Side } from "../../../types/piece.types.js";
import { legalDropPositions_IgnorePawnMate } from "../legalMovePositions/ignorePawnMate.js";
import { isPawnMateDrop } from "../legalMovePositions/isPawnMated.js";


const byPiece = (board: Board, hands: Hands, kind: NormalPieceKind, side: Side): Position[] => {
  if (!hands.allPieceKindsBySide(side).some(k => k === kind)) {
    return [];
  }

  const positions: Position[] = legalDropPositions_IgnorePawnMate.byPiece(board, hands, kind, side);

  return positions.filter(pos => {
    return !isPawnMateDrop(board, hands, side, pos, kind);
  });
}


const all = (board: Board, hands: Hands, side: Side): Position[] => {
  let positions: Position[] = [];
  const pieceKinds = hands.allPieceKindsBySide(side);

  pieceKinds.forEach(kind => {
    positions.push(
      ...byPiece(board, hands, kind, side)
    );
  })

  return positions;
}


export const legalDropPositions = {
  byPiece,
  all
}
