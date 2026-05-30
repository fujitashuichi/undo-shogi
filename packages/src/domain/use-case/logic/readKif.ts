import { hirateGameState } from "../../entities/GameState/hirateGameState.js";
import { executeActions } from "../../service/kif-commands/executeActions.js";
import { kifToActions } from "../../service/kif-formatter/kifToActions.js";
import type { GameHistory } from "../types/gameHistory.types.js";
import { checkGameEnd } from "./checkGameEnd.js";


export const readKif = (kif: string): GameHistory => {
  const actions = kifToActions(kif);
  const gameStates = executeActions(actions, hirateGameState);

  const gameEndStatus = checkGameEnd(gameStates);

  return {
    gameEndStatus,
    history: gameStates
  }
}
