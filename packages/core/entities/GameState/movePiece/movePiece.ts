import type { Position } from "../../types/algebraic.types.js";
import { GameState } from "../GameState.js";
import { positionValidator } from "../validators/positionValidator.js";

export const gameState_movePiece = (gameState: GameState, current: Position, next: Position, promote: boolean): GameState => {
  positionValidator.assertInBoard(current.x, current.y);
  positionValidator.assertInBoard(next.x, next.y);


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

  return new GameState(nextBoard, nextHands, nextSide);
}
