import type { Board } from "../../../Board/Board.js";
import { ShogiPieceNormal } from "../../../Piece/Piece.js";
import type { Position } from "../../../types/algebraic.types.js";
import type { NormalPieceKind } from "../../../types/piece.types.js";
import { allPositionInBoard } from "../../../lib/positions/positionsUnderAttack/allPositionsInBoard.js";
import type { Hands } from "../../../Hand/Hands.js";
import { isChecked } from "../../validators/checkmate/isChecked.js";
import type { Side } from "../../../types/players.types.js";


const byPiece = (board: Board, hands: Hands, kind: NormalPieceKind, side: Side): Position[] => {
  if (!hands.allPieceKindsBySide(side).some(k => k === kind)) {
    return [];
  }

  let positions: Position[] = [];
  allPositionInBoard.forEach(pos => {
    try {
      const nextBoard = board.dropPiece(pos, new ShogiPieceNormal(side, kind));
      if (isChecked(nextBoard, side)) {
        return;
      }

      positions.push(pos);
    } catch {
      return;
    }
  });

  return positions;
}


const all = (board: Board, hands: Hands, side: Side): Position[] => {
  const positionsSet = new Set<Position>();
  const pieceKinds = hands.allPieceKindsBySide(side);

  pieceKinds.forEach(kind => {
    const validPositions = byPiece(board, hands, kind, side);
    validPositions.forEach(pos => {
      positionsSet.add(pos);
    });
  });

  return Array.from(positionsSet);
}


export const legalDropPositions_IgnoreDropPawnMate = {
  byPiece,
  all
}