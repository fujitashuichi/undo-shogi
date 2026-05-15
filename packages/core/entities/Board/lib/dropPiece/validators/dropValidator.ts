import { logger } from "../../../../../../tools/index.js";
import { isInsideRange } from "../../../../../../tools/math/isInsideRange.js";
import { MovementError } from "../../../../../errors/movement.errors.js";
import { boardConfig } from "../../../../config/boardConfig.js";
import type { Hands } from "../../../../Hand/Hand.js";
import { allPositionInBoard } from "../../../../lib/allPositionsInBoard.js";
import { ShogiPiece } from "../../../../Piece/Piece.js";
import { ShogiRulesValidator } from "../../../../rules/shogiRulesValidator.js";
import type { Position } from "../../../../types/algebraic.types.js";
import type { Side } from "../../../../types/piece.types.js";
import { Board } from "../../../Board.js";
import { positionValidator } from "../../../validators/positionValidator.js";


const boardSize = boardConfig.boardSize;


export const dropValidator = {
  assertCanDrop: (board: Board, position: Position, piece: ShogiPiece): void => {
    positionValidator.assertInBoard(position.x, position.y);
    const pieceInTargetSquare = board.squares[position.y]![position.x];

    if (pieceInTargetSquare) {
      logger.error("そのマスには駒が存在するため持ち駒を打てません。");
      throw new MovementError("DROP_TO_INVALID_SQUARE");
    }


    if (piece.kind === "Knight") {
      // 桂馬は相手陣地2段目以内に打てません（移動不能な駒となるため）
      const invalidYRange: [number, number] = piece.side === "Sente" ? [0, 1] : [boardSize - 1, boardSize - 2];
      if (isInsideRange(position.y, invalidYRange)) {
        throw new MovementError("DROP_TO_INVALID_SQUARE");
      }
    }

    if (piece.kind === "Lance" || piece.kind === "Pawn") {
      // 前にしか動けない駒は、最下段に打てません（移動不能な駒となるため）
      const invalidY = piece.side === "Sente" ? 0 : boardSize - 1;
      if (position.y === invalidY) {
        throw new MovementError("DROP_TO_INVALID_SQUARE");
      }
    }

    if (piece.kind === "Pawn") {
      ShogiRulesValidator.assertIllegalMove.drop.violateDoublePawn(board, position, piece.side);
    }
  },

  canDrop: (board: Board, position: Position, piece: ShogiPiece): boolean => {
    try {
      dropValidator.assertCanDrop(board, position, piece);
      return true;
    } catch {
      return false;
    }
  },

  canAnyDrop: (board: Board, hands: Hands, side: Side): boolean => {
    for(const pos of allPositionInBoard) {
      for (const kind of hands.allPieceKindsBySide(side)) {
        const canDrop = dropValidator.canDrop(board, pos, new ShogiPiece(side, kind));
        if (canDrop) return true;
      }
    }

    return false;
  }
}
