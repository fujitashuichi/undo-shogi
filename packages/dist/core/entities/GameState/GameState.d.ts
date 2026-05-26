import { Board } from "../Board/Board.js";
import { Hands } from "../Hand/Hands.js";
import type { Position } from "../types/algebraic.types.js";
import type { NormalPieceKind, Side } from "../types/piece.types.js";
export declare class GameState {
    readonly board: Board;
    readonly hands: Hands;
    readonly currentSide: Side;
    readonly checked: Side | null;
    readonly checkMated: Side | null;
    constructor(board: Board, hands: Hands, currentSide?: Side);
    readonly movePiece: (current: Position, next: Position, promote: boolean) => GameState;
    readonly dropPiece: (position: Position, kind: NormalPieceKind) => GameState;
}
//# sourceMappingURL=GameState.d.ts.map