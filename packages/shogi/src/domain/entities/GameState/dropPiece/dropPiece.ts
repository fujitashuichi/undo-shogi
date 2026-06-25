import { MovementError } from "../../errors/movement.errors.js";
import type { ShogiPieceNormal } from "../../Piece/Piece.js";
import type { Position } from "../../types/algebraic.types.js";
import { GameState } from "../GameState.js";
import { isChecked } from "../validators/checkmate/isChecked.js";


export const gameState_dropPiece = (gameState: GameState, position: Position, piece: ShogiPieceNormal): GameState => {
  const nextBoard = gameState.board.dropPiece(position, piece);
  const nextHands = gameState.hands.takePiece(gameState.currentSide, piece.kind);
  const nextSide = gameState.currentSide === "Sente" ? "Gote" : "Sente";

  // 王手放置
  if (isChecked(nextBoard, gameState.currentSide)) {
    throw new MovementError("SELF_CHECKED");
  };

  return new GameState(nextBoard, nextHands, nextSide)
}