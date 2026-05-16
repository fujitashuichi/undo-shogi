import { MovementError } from "../../../../errors/movement.errors.js";
import type { Hands } from "../../../Hand/Hands.js";
import type { Position } from "../../../types/algebraic.types.js";
import { Board } from "../../Board.js";
import { violateSelfCheck } from "../../validators/checkmate/violateSelfCheck.js";
import { moveValidator } from "./validators/moveValidator.js";

export const board_movePiece = (board: Board, hands: Hands, current: Position, next: Position, promote: boolean) => {
  moveValidator.assertCanMove(board, current, next, promote);


  let targetPiece = board.squares[current.y]![current.x];
  if (!targetPiece) throw new MovementError("MOVE_UNDEFINED_PIECE");

  if (promote) {
    targetPiece = targetPiece.promote();
  }

  const nextSquares = board.squares.map((row, yIdx) =>
    row.map((piece, xIdx) => {
      if (yIdx === next.y && xIdx === next.x) return targetPiece;
      if (yIdx === current.y && xIdx === current.x) return undefined;
      return piece;
    })
  ) as Board["squares"];


  const side = board.squares[current.y]![current.x]!.side;
  let newBoard;

  const tookPiece = board.squares[next.y]![next.x];
  if (tookPiece) {
    const nextHands = board.takePiece({ x: next.x, y: next.y }, side).hands;
    newBoard = new Board(nextSquares, nextHands);
  } else {
    newBoard = new Board(nextSquares, hands);
  }

  violateSelfCheck(newBoard, side);

  return newBoard;
}
