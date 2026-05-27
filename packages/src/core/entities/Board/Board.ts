import type { FixedLengthArray } from "../../../tools/index.js";
import type { ShogiPiece, ShogiPieceNormal } from "../Piece/Piece.js";
import type { Position } from "../types/algebraic.types.js";
import { board_dropPiece } from "./lib/dropPiece/dropPiece.js";
import { board_movePiece } from "./lib/movePiece/movePiece.js";


// Boardは動作のみ保証する。駒の増減などは責務ではないと定義する。


type Squares = FixedLengthArray<
  FixedLengthArray<ShogiPiece | undefined, 9>, 9
>;


export class Board {
  public readonly squares: Squares;

  constructor(
    squares: Squares
  ) {
    this.squares = squares;
  }


  public readonly movePiece = (current: Position, next: Position, promote: boolean): Board => {
    return board_movePiece(this, current, next, promote);
  }

  public readonly dropPiece = (position: Position, piece: ShogiPieceNormal): Board => {
    return board_dropPiece(this, position, piece);
  }
}
