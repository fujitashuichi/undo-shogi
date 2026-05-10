import type { FixedLengthArray } from "../../../tools/index.js";
import type { ShogiPiece } from "../Piece.js";
import type { Position } from "../types/algebraic.types.js";


// Boardは動作のみ保証する。駒の増減などは責務ではないと定義する。


type Squares = FixedLengthArray<
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


  public readonly movePiece = (current: Position, next: Position, promote: boolean) => {
    const currentFile = current.file;
    const currentRow = current.row;

    const nextFile = next.file;
    const nextRow = next.row;

    let movingPiece = this.squares[currentRow]![currentFile];
    if (!movingPiece) throw new Error("駒が見つかりません");

    if (promote) {
      movingPiece = movingPiece.promote();
    }

    const nextSquares = this.squares.map((row, rIdx) =>
      row.map((piece, cIdx) => {
        if (rIdx === nextRow && cIdx === nextFile) return movingPiece;
        if (rIdx === currentRow && cIdx === currentFile) return undefined;
        return piece;
      })
    ) as Squares;

    return new Board(nextSquares);
  }


  // 持ち駒を打つ
  public readonly dropPiece = (position: Position, piece: ShogiPiece) => {
    const targetFile = position.file;
    const targetRow = position.row;


    const nextSquares = this.squares.map((row, rIdx) =>
      row.map((currentPiece, fIdx) => {
        if (rIdx === targetRow && fIdx === targetFile) return piece;
        return currentPiece;
      })
    ) as Squares;

    return new Board(nextSquares);
  }
}
