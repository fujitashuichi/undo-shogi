import type { GameState } from "../../entities/GameState/GameState.js";
export type GameHistory = {
    gameEndStatus: GameEndStatus;
    history: GameState[];
};
export type GameEndStatus = {
    ended: false;
} | {
    ended: true;
    winner: "Sente" | "Gote" | "Draw";
};
//# sourceMappingURL=gameHistory.types.d.ts.map