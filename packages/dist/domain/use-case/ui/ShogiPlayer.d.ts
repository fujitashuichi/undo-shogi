import type { Position } from "../../entities/types/algebraic.types.js";
import type { NormalPieceKind } from "../../entities/types/piece.types.js";
import { type DomainError } from "../errors/domainError.js";
import type { GameHistory } from "../types/gameHistory.types.js";
type PlayResult = {
    success: false;
    error: DomainError;
} | {
    success: true;
    nextPlayer: ShogiPlayer;
};
export declare class ShogiPlayer {
    readonly history: GameHistory;
    constructor(history: GameHistory);
    static init: {
        hirate: () => PlayResult;
    };
    readonly play: {
        movePiece: (currentPos: Position, nextPos: Position, promote: boolean) => PlayResult;
        dropPiece: (position: Position, kind: NormalPieceKind) => PlayResult;
        undo: () => PlayResult;
    };
}
export {};
//# sourceMappingURL=ShogiPlayer.d.ts.map