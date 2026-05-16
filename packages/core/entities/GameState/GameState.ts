import { Board } from "../Board/Board.js";
import { Hands } from "../Hand/Hands.js";
import type { ShogiPieceNormal } from "../Piece/Piece.js";
import type { Position } from "../types/algebraic.types.js";
import type { Side } from "../types/piece.types.js";
import { gameState_dropPiece } from "./dropPiece/dropPiece.js";
import { isChecked } from "./lib/checkmate/isChecked.js";
import { isCheckMated } from "./lib/checkmate/isCheckMated.js";
import { gameState_movePiece } from "./movePiece/movePiece.js";


export class GameState {
  public readonly board: Board;
  public readonly hands: Hands;
  public readonly currentSide: Side;
  public readonly checked: Side | null = null;
  public readonly checkMated: Side | null = null;

  constructor(
    board: Board,
    hands: Hands,
    currentSide: Side = "Sente"
  ) {
    this.board = board;
    this.hands = hands;
    this.currentSide = currentSide;

    this.checked = isChecked(board, currentSide) ? currentSide : null;
    this.checkMated = isCheckMated(board, hands, currentSide) ? currentSide : null;
  }


  public readonly movePiece = (current: Position, next: Position, promote: boolean): GameState => {
    return gameState_movePiece(this, current, next, promote);
  }


  public readonly dropPiece = (position: Position, piece: ShogiPieceNormal): GameState => {
    return gameState_dropPiece(this, position, piece);
  }
}
