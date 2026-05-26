import type { UUID } from "crypto";
import { type NormalPieceKind, type PieceKind, type Side } from "../types/piece.types.js";
export declare class ShogiPiece {
    readonly side: Side;
    readonly kind: PieceKind;
    readonly id: UUID;
    readonly motion: PieceConfig["motion"];
    isPromoted: boolean;
    constructor(side: Side, kind: PieceKind, id?: UUID);
    promote: () => ShogiPiece;
    disPromote: () => ShogiPieceNormal;
    changeSide: () => ShogiPiece;
}
export declare class ShogiPieceNormal extends ShogiPiece {
    readonly side: Side;
    readonly kind: NormalPieceKind;
    readonly id: UUID;
    constructor(side: Side, kind: NormalPieceKind, id?: UUID);
}
//# sourceMappingURL=Piece.d.ts.map