import type { NormalPieceKind } from "../types/piece.types.js";
import type { Side } from "../types/players.types.js";


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

  public static init = {
    empty: () => {
      return new Hands({
        Sente: {
          King: 0, Gold: 0, Silver: 0, Knight: 0, Lance: 0,
          Bishop: 0, Rook: 0,
          Pawn: 0
        },
        Gote: {
          King: 0, Gold: 0, Silver: 0, Knight: 0, Lance: 0,
          Bishop: 0, Rook: 0,
          Pawn: 0
        }
      })
    },

    full: () => {
      return new Hands({
        Sente: {
          King: 0, Gold: 2, Silver: 2, Knight: 2, Lance: 2,
          Bishop: 1, Rook: 1,
          Pawn: 9
        },
        Gote: {
          King: 0, Gold: 2, Silver: 2, Knight: 2, Lance: 2,
          Bishop: 1, Rook: 1,
          Pawn: 9
        }
      })
    }
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
