import type { NormalPieceKind, PieceKind } from "../../core/entities/types/piece.types.js";
export type MoveAction = {
    type: "move";
    from: {
        x: number;
        y: number;
    };
    to: {
        x: number;
        y: number;
    };
    kind: PieceKind;
    promote: boolean;
} | {
    type: "drop";
    to: {
        x: number;
        y: number;
    };
    kind: NormalPieceKind;
};
export type KifPosition = {
    x: number;
    y: number;
};
//# sourceMappingURL=types.d.ts.map