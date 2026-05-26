export class Hands {
    pieceRecord;
    constructor(pieceRecord) {
        this.pieceRecord = pieceRecord;
    }
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