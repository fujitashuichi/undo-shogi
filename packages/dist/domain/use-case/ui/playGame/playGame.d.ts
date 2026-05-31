import type { Position } from "../../../entities/types/algebraic.types.js";
import type { NormalPieceKind } from "../../../entities/types/piece.types.js";
import type { GameHistory } from "../../types/gameHistory.types.js";
type PlayGameResult = {
    movePiece(currentPos: Position, nextPos: Position, promote: boolean): GameHistory;
    dropPiece(position: Position, kind: NormalPieceKind): GameHistory;
    undo(): GameHistory;
};
export declare const playGame: (gameHistory: GameHistory) => PlayGameResult;
export {};
//# sourceMappingURL=playGame.d.ts.map