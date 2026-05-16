import { isInsideRange } from "../../../../../../tools/math/isInsideRange.js";
import { MovementError } from "../../../../../errors/movement.errors.js";
import { boardConfig } from "../../../../config/boardConfig.js";
import { ShogiPieceNormal } from "../../../../Piece/Piece.js";
import { ShogiRulesValidator } from "../../../../rules/shogiRulesValidator.js";
import type { Position } from "../../../../types/algebraic.types.js";
import type { Board } from "../../../Board.js";


const boardSize = boardConfig.boardSize;


export const dropValidator = {
  assertCanDrop: (board: Board, position: Position, piece: ShogiPieceNormal): void => {
    const pieceInTargetSquare = board.squares[position.y]![position.x];

    if (pieceInTargetSquare) {
      throw new MovementError("DROP_TO_INVALID_SQUARE");
    }


    if (piece.kind === "Knight") {
      const invalidYRange: [number, number] = piece.side === "Sente" ? [0, 1] : [boardSize - 1, boardSize - 2];
      if (isInsideRange(position.y, invalidYRange)) {
        throw new MovementError("DROP_TO_INVALID_SQUARE");
      }
    }

    if (piece.kind === "Lance" || piece.kind === "Pawn") {
      const invalidY = piece.side === "Sente" ? 0 : boardSize - 1;
      if (position.y === invalidY) {
        throw new MovementError("DROP_TO_INVALID_SQUARE");
      }
    }

    if (piece.kind === "Pawn") {
      ShogiRulesValidator.assertIllegalMove.drop.violateDoublePawn(board, position, piece.side);
    }
  },

  canDrop: (board: Board, position: Position, piece: ShogiPieceNormal): boolean => {
    try {
      dropValidator.assertCanDrop(board, position, piece);
      return true;
    } catch {
      return false;
    }
  }
}
