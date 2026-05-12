import type { FixedLengthArray } from "../../../tools/index.js";
import { MovementError } from "../../errors/movement.errors.js";
import { boardConfig } from "../config/boardConfig.js";
import type { ShogiPiece } from "../Piece/Piece.js";
import type { Position } from "../types/algebraic.types.js";
import { moveValidator } from "./validators/moveValidator.js";


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
    moveValidator.canMove(this, current, next);

    const currentX = current.x;
    const currentY = current.y;

    const nextX = next.x;
    const nextY = next.y;

    let targetPiece = this.squares[currentY]![currentX];
    if (!targetPiece) throw new MovementError("MOVE_UNDEFINED_PIECE");

    if (promote) {
      targetPiece = targetPiece.promote();
    }

    const nextSquares = this.squares.map((row, yIdx) =>
      row.map((piece, xIdx) => {
        if (yIdx === nextY && xIdx === nextX) return targetPiece;
        if (yIdx === currentY && xIdx === currentX) return undefined;
        return piece;
      })
    ) as Squares;

    return new Board(nextSquares);
  }


  // 持ち駒を打つ
  public readonly dropPiece = (position: Position, piece: ShogiPiece) => {
    moveValidator.canDrop(this, position, piece);

    const targetX = position.x;
    const targetY = position.y;


    const nextSquares = this.squares.map((row, yIdx) =>
      row.map((currentPiece, xIdx) => {
        if (yIdx === targetY && xIdx === targetX) return piece;
        return currentPiece;
      })
    ) as Squares;

    return new Board(nextSquares);
  }



  /* ↓ デバッグ用のメソッド */

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
            if (!piece) return "  ・  ";

            const side = piece.side === "Sente" ? "▲" : "△";
            const kanji = kindToKanji[piece.kind] || "？";

            const displayKind = piece.isPromoted
              ? `${kanji}+`
              : `${kanji} `;

            return ` ${side}${displayKind} `;
          })
          .join("")
      )
      .join("\n\n");

    return `\n ☆ 盤面図 \n${graph}\n`;
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
