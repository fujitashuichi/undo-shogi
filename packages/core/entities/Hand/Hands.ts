import type { NormalPieceKind, Side } from "../types/piece.types.js";


type PieceRecord = Record<
  Side,
  Record<NormalPieceKind, number>
>;


export class Hands {
  public pieceRecord: PieceRecord;

  constructor (
    pieceRecord: PieceRecord
  ) {
    this.pieceRecord = pieceRecord;
  }


  public readonly addPiece = (side: Side, kind: NormalPieceKind) => {
    const nextRecord = {
      Sente: { ...this.pieceRecord.Sente },
      Gote: { ...this.pieceRecord.Gote }
    };
    nextRecord[side][kind]++
    return new Hands(nextRecord);
  }

  public readonly takePiece = (side: Side, kind: NormalPieceKind) => {
    const nextRecord = {
      Sente: { ...this.pieceRecord.Sente },
      Gote: { ...this.pieceRecord.Gote }
    };
    nextRecord[side][kind]--
    return new Hands(nextRecord);
  }

  public readonly allPieceKindsBySide = (side: Side): NormalPieceKind[] => {
    const keys = Object.keys(this.pieceRecord[side]) as NormalPieceKind[];
    return keys.filter(kind => this.pieceRecord[side][kind] > 0);
  }
}
