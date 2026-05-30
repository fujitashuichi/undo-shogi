import { MovementError } from "../../errors/movement.errors.js";
import type { Position } from "../../types/algebraic.types.js";
import { GameState } from "../GameState.js";
import { isChecked } from "../validators/checkmate/isChecked.js";

export const gameState_movePiece = (gameState: GameState, current: Position, next: Position, promote: boolean): GameState => {
  const pieceInNextPos = gameState.board.squares[next.y]![next.x];
  let nextHands = gameState.hands;

  if (pieceInNextPos) {
    nextHands = gameState.hands.addPiece(
      gameState.currentSide,
      pieceInNextPos.disPromote().kind
    );
  }

  const nextBoard = gameState.board.movePiece(current, next, promote);
  const nextSide = gameState.currentSide === "Sente" ? "Gote" : "Sente";

  // 王手放置
  if (isChecked(nextBoard, gameState.currentSide)) {
    throw new MovementError("SELF_CHECKED");
  };

  return new GameState(nextBoard, nextHands, nextSide);
}
