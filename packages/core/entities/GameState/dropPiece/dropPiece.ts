import type { ShogiPieceNormal } from "../../Piece/Piece.js";
import type { Position } from "../../types/algebraic.types.js";
import { GameState } from "../GameState.js";
import { positionValidator } from "../validators/positionValidator.js";


export const gameState_dropPiece = (gameState: GameState, position: Position, piece: ShogiPieceNormal): GameState => {
  positionValidator.assertInBoard(position.x, position.y);

  const nextBoard = gameState.board.dropPiece(position, piece);
  const nextHands = gameState.hands.takePiece(gameState.currentSide, piece.kind);
  const nextSide = gameState.currentSide === "Sente" ? "Gote" : "Sente";

  return new GameState(nextBoard, nextHands, nextSide)
}