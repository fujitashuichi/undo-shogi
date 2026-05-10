import type { FixedLengthArray } from "../../../tools/index.js";
import { MovementError } from "../../errors/movement.errors.js";
import { boardConfig } from "../config/boardConfig.js";
import type { ShogiPiece } from "../Piece.js";
import type { Position } from "../types/algebraic.types.js";


// Boardは動作のみ保証する。駒の増減などは責務ではないと定義する。


type Squares = FixedLengthArray<
  FixedLengthArray<ShogiPiece | undefined, 9>, 9
>;


export class Board {
  public readonly squares: Squares;
  public readonly boardSize = boardConfig.boardSize;

  constructor(
    squares: Squares
  ) {
    this.squares = squares;
  }


  public readonly movePiece = (current: Position, next: Position, promote: boolean) => {
    const currentX = current.x;
    const currentY = current.y;

    const nextX = next.x;
    const nextY = next.y;

    let movingPiece = this.squares[currentY]![currentX];
    if (!movingPiece) throw new MovementError("MOVE_UNDEFINED_PIECE");

    if (promote) {
      movingPiece = movingPiece.promote();
    }

    const nextSquares = this.squares.map((row, rIdx) =>
      row.map((piece, cIdx) => {
        if (rIdx === nextY && cIdx === nextX) return movingPiece;
        if (rIdx === currentY && cIdx === currentX) return undefined;
        return piece;
      })
    ) as Squares;

    return new Board(nextSquares);
  }


  // 持ち駒を打つ
  public readonly dropPiece = (position: Position, piece: ShogiPiece) => {
    const targetX = position.x;
    const targetY = position.y;


    const nextSquares = this.squares.map((row, rIdx) =>
      row.map((currentPiece, fIdx) => {
        if (rIdx === targetX && fIdx === targetY) return piece;
        return currentPiece;
      })
    ) as Squares;

    return new Board(nextSquares);
  }


  public debugRenderKanji(): string {
    const kindToKanji: Record<string, string> = {
      Pawn: "歩",
      Lance: "香",
      Knight: "桂",
      Silver: "銀",
      Gold: "金",
      Bishop: "角",
      Rook: "飛",
      King: "玉",
    };

    const graph = this.squares
      .map((row) =>
        row
          .map((piece) => {
            if (!piece) return "  ・ ";

            const side = piece.side === "Sente" ? "▲" : "△";
            const kanji = kindToKanji[piece.kind] || "？";

            const displayKind = piece.isPromoted
              ? kanji.toUpperCase()
              : kanji.toLowerCase();

            return ` ${side}${displayKind} `;
          })
          .join("")
      )
      .join("\n");

    return `\n${graph}\n`;
  }

  public debugRender(): string {
    const graph = this.squares
      .map((row) =>
        row
          .map((piece) => {
            if (!piece) return " ・ ";
            const side = piece.side === "Sente" ? "▲" : "△";
            if (piece.isPromoted) {
              return ` ${side}${piece.kind.slice(0, 1)} `;
            }
            return ` ${side}${piece.kind.slice(0, 1).toLowerCase()} `;
          })
          .join("")
      )
      .join("\n");

    return `※成り駒は大文字で表記します\n\n${graph}\n`;
  }
}
