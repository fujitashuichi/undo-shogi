import type { GameState } from "../../entities/GameState/GameState.js";
import type { GameEndStatus } from "../logic/checkGameEnd.js";

export type GameHistory = {
  gameEndStatus: GameEndStatus,
  history: GameState[]
}
