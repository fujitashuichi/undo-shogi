import type { Side } from "@/schemas/primitive/players.js";
import type { Board } from "../../../Board/Board.js";
import type { Hands } from "../../../Hands/Hands.js";
import { legalDropPositions_IgnoreDropPawnMate } from "./ignoreDropPawnMate.js";
import { isPawnMateDrop } from "./isPawnMateDrop.js";
import type { Position } from "@/schemas/primitive/algebraic.js";
import type { NormalPieceKind } from "@/schemas/primitive/piece.js";


const byPiece = (board: Board, hands: Hands, kind: NormalPieceKind, side: Side): Position[] => {
  if (!hands.allPieceKindsBySide(side).some(k => k === kind)) {
    return [];
  }

  const positions: Position[] = legalDropPositions_IgnoreDropPawnMate.byPiece(board, hands, kind, side);

  return positions.filter(pos => {
    return !isPawnMateDrop(board, hands, side, pos, kind);
  });
}


const all = (board: Board, hands: Hands, side: Side): Position[] => {
  let legalPosList: Position[] = [];
  const pieceKinds = hands.allPieceKindsBySide(side);

  pieceKinds.forEach(kind => {
    legalPosList.push(
      ...byPiece(board, hands, kind, side)
    );
  })

  const uniqueMap = new Map(legalPosList.map(p => [`${p.x},${p.y}`, p]));
  return [...uniqueMap.values()];
}


export const legalDropPositions = {
  byPiece,
  all
}
