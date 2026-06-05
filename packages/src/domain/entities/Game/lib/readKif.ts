import { GameState } from "../../GameState/GameState.js";
import type { GameHistory } from "../types/gameHistory.types.js";
import { checkGameEnd } from "./checkGameEnd.js";
import { executeActions } from "./kif/kif-commands/executeActions.js";
import { kifToActions } from "./kif/kif-formatter/kifToActions.js";


export const readKif = (kif: string): GameHistory => {
  const actions = kifToActions(kif);
  const gameStates = executeActions(actions, GameState.init.hirate());

  const gameEndStatus = checkGameEnd(gameStates);

  return {
    gameEndStatus,
    history: gameStates
  }
}
