import type { Board } from "../../../Board/Board.js";
import type { Hands } from "../../../Hand/Hands.js";
import type { Position } from "../../../types/algebraic.types.js";
import type { NormalPieceKind, Side } from "../../../types/piece.types.js";
export declare const legalDropPositions: {
    byPiece: (board: Board, hands: Hands, kind: NormalPieceKind, side: Side) => Position[];
    all: (board: Board, hands: Hands, side: Side) => Position[];
};
//# sourceMappingURL=legalDropPositions.d.ts.map