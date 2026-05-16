import type { FixedLengthArray } from "../../../tools/index.js";
import { boardConfig } from "../config/boardConfig.js";
import type { ShogiPiece, ShogiPieceNormal } from "../Piece/Piece.js";
import type { Position } from "../types/algebraic.types.js";
import { checkmateValidator } from "./validators/checkmate/checkmateValidator.js";
import { board_dropPiece } from "./lib/dropPiece/dropPiece.js";
import { board_movePiece } from "./lib/movePiece/movePiece.js";
import type { Hands } from "../Hand/Hands.js";
import type { Side } from "../types/piece.types.js";


// Boardは動作のみ保証する。駒の増減などは責務ではないと定義する。


type Squares = FixedLengthArray<
  FixedLengthArray<ShogiPiece | undefined, 9>, 9
>;


export class Board {
  public readonly squares: Squares;
  public readonly hands: Hands;
  public readonly boardSize = boardConfig.boardSize;

  constructor(
    squares: Squares,
    hands: Hands
  ) {
    this.squares = squares;
    this.hands = hands;
  }


  public readonly movePiece = (current: Position, next: Position, promote: boolean): Board => {
    return board_movePiece(this, this.hands, current, next, promote);
  }

  public readonly dropPiece = (position: Position, piece: ShogiPieceNormal): Board => {
    return board_dropPiece(this, this.hands, position, piece);
  }

  public readonly takePiece = (position: Position, side: Side): Board => {
    const piece = this.squares[position.y]![position.x];

    if (!piece) return this;

    const nextHands = this.hands.addPiece(side, piece.disPromote().kind);

    return new Board(this.squares, nextHands);
  }


  public readonly isCheckMated = (hands: Hands, side: Side) => checkmateValidator.isCheckMated(this, side);



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
