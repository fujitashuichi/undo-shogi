import { Board } from "../../Board/Board.js";
import { positionValidator } from "../../Board/validators/positionValidator.js";
import type { Position } from "../../types/algebraic.types.js";
import type { Side } from "../../types/piece.types.js";
import { byPiece_Infinity } from "./byPiece_Infinity.js";
import { searchPiecesBySide } from "../searchPiecesBySide.js";


// underAttack は「駒の効き」を意味しており、駒が移動可能な範囲を指す

// memo: 目的の駒自身を効きから省く → 「自分sideの駒がある場所を省く」に含まれるため不要


const byPiece = (board: Board, piecePos: Position): Position[] => {
  let positionsUnderAttack: Position[] = [];

  const piece = board.squares[piecePos.y]![piecePos.x];
  if (!piece) return [];

  const vectors = piece.motion.vectors;

  vectors.forEach(vector => {
    const dx = vector.dx;
    const dy = vector.dy;

    let x = piecePos.x + dx;
    let y = piecePos.y + dy;


    if (vector.infinity) {
      byPiece_Infinity(board, piece, x, y, dx, dy, positionsUnderAttack);
    } else {
      if (positionValidator.isInBoard(x, y)) {
        const square = board.squares[y]![x];

        if (
          square &&
          square.side !== piece.side
        ) {
          positionsUnderAttack.push({ x, y });
        };

        if (!square) {
          positionsUnderAttack.push({ x, y });
        }
      };
    };
  });

  return positionsUnderAttack;
}


const all = (board: Board, side: Side): Position[] => {
  let positionsUnderAttack: Position[] = [];

  const piecePosList = searchPiecesBySide.returnPositions(board, side);

  piecePosList.forEach(pos => {
    positionsUnderAttack.push(
      ...byPiece(board, pos)
    );
  });

  return positionsUnderAttack;
}


export const positionsUnderAttack = {
  byPiece,
  all
}
