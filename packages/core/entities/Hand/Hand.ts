import { ShogiPiece } from "../Piece/Piece.js";
import type { Side } from "../types/piece.types.js";


type PieceRecord = Record<
  Side,
  Record<ShogiPiece["kind"], number>
>;


export class Hands {
  public pieceRecord: PieceRecord;

  constructor (
    pieceRecord: PieceRecord
  ) {
    this.pieceRecord = pieceRecord;
  }


  public readonly addPiece = (side: Side, kind: ShogiPiece["kind"]) => {
    this.pieceRecord[side][kind]++
    return this;
  }

  public readonly takePiece = (side: Side, kind: ShogiPiece["kind"]) => {
    this.pieceRecord[side][kind]--
    return this;
  }

  public readonly allPieceKindsBySide = (side: Side): ShogiPiece["kind"][] => {
    return (Object.keys(this.pieceRecord[side]) as ShogiPiece["kind"][]).filter(
      (kind) => this.pieceRecord[side][kind] > 0
    );
  }
}
