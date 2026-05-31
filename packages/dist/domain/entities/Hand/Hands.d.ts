import type { NormalPieceKind, Side } from "../types/piece.types.js";
type PieceRecord = Record<Side, Record<NormalPieceKind, number>>;
export declare class Hands {
    pieceRecord: PieceRecord;
    constructor(pieceRecord: PieceRecord);
    static init: {
        empty: () => Hands;
        full: () => Hands;
    };
    readonly addPiece: (side: Side, kind: NormalPieceKind) => Hands;
    readonly takePiece: (side: Side, kind: NormalPieceKind) => Hands;
    readonly allPieceKindsBySide: (side: Side) => NormalPieceKind[];
}
export {};
//# sourceMappingURL=Hands.d.ts.map