import type { FixedLengthArray } from "../../../tools/index.js";
import type { ShogiPiece } from "../Piece.js";
import { hirateSquares } from "./hirateSquares.js";


type Squares =FixedLengthArray<
  FixedLengthArray<ShogiPiece | undefined, 9>, 9
>;


export class Board {
  public readonly boardSize = 9;
  public readonly squares: Squares;

  constructor(
    squares: Squares
  ) {
    this.squares = squares;
  }
}
