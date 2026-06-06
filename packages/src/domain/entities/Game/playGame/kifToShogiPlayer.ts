import { createInitialStateByKif } from "../lib/kif/createInitialStateByKif.js";
import { Game } from "../Game.js";
import { executeActions } from "../lib/kif/kif-commands/executeActions.js";
import { kifToActions } from "../lib/kif/kif-formatter/kifToActions.js";
import { checkGameEnd } from "../lib/checkGameEnd.js";


export const kifToShogiPlayer = (kif: string): Game => {
  const initialState = createInitialStateByKif(kif);

  const gameStates = executeActions(
    kifToActions(kif),
    initialState
  );

  const history: Game["status"] = {
    gameEndStatus: checkGameEnd(gameStates),
    history: gameStates
  }

  return new Game(
    history
  )
}
