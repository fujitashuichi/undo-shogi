export class Hands {
    pieceRecord;
    constructor(pieceRecord) {
        this.pieceRecord = pieceRecord;
    }
    static init = {
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
            });
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
            });
        }
    };
    addPiece = (side, kind) => {
        const nextRecord = {
            Sente: { ...this.pieceRecord.Sente },
            Gote: { ...this.pieceRecord.Gote }
        };
        nextRecord[side][kind]++;
        return new Hands(nextRecord);
    };
    takePiece = (side, kind) => {
        const nextRecord = {
            Sente: { ...this.pieceRecord.Sente },
            Gote: { ...this.pieceRecord.Gote }
        };
        nextRecord[side][kind]--;
        return new Hands(nextRecord);
    };
    allPieceKindsBySide = (side) => {
        const keys = Object.keys(this.pieceRecord[side]);
        return keys.filter(kind => this.pieceRecord[side][kind] > 0);
    };
}
//# sourceMappingURL=Hands.js.map