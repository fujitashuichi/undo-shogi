import { Board } from "../Board/Board.js";
import { Hands } from "../Hand/Hands.js";
import type { ShogiPiece, ShogiPieceNormal } from "../Piece/Piece.js";
import type { Position } from "../types/algebraic.types.js";
import type { Side } from "../types/piece.types.js";
import { isCheckMated } from "./validators/checkmate/isCheckMated.js";


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


  public readonly movePiece = (current: Position, next: Position, promote: boolean) => {
    const pieceInNextPos = this.board.squares[next.y]![next.x];
    let nextHands = this.hands;

    if (pieceInNextPos) {
      nextHands = this.hands.addPiece(this.currentSide, pieceInNextPos.disPromote().kind)
    }

    const nextBoard = this.board.movePiece(current, next, promote);
    const nextSide = this.currentSide === "Sente" ? "Gote" : "Sente";

    return new GameState(nextBoard, nextHands, nextSide);
  }


  public readonly dropPiece = (position: Position, piece: ShogiPieceNormal) => {
    const nextBoard = this.board.dropPiece(position, piece);
    const nextHands = this.hands.takePiece(this.currentSide, piece.kind);
    const nextSide = this.currentSide === "Sente" ? "Gote" : "Sente";

    return new GameState(nextBoard, nextHands, nextSide)
  }
}
