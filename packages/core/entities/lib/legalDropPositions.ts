import type { Board } from "../Board/Board.js";
import type { Hands } from "../Hand/Hands.js";
import { ShogiPieceNormal } from "../Piece/Piece.js";
import type { Position } from "../types/algebraic.types.js";
import type { Side } from "../types/piece.types.js";
import { allPositionInBoard } from "./allPositionsInBoard.js";


export const legalDropsPositions = (board: Board, hands: Hands, side: Side) => {
  let positions: Position[] = [];
  const pieces = hands.allPieceKindsBySide(side);

  allPositionInBoard.forEach(pos => {
    pieces.forEach(piece => {
      try {
        board.dropPiece(pos, new ShogiPieceNormal(side, piece));
        positions.push(pos);
      } catch {}
    });
  });

  return positions;
}
