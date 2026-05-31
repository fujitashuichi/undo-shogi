import { executeActions } from "../../../service/kif-commands/executeActions.js";
import { kifToActions } from "../../../service/kif-formatter/kifToActions.js";
import { checkGameEnd } from "../../logic/checkGameEnd.js";
import { createInitialStateByKif } from "../lib/createInitialStateByKif.js";
import { ShogiPlayer } from "../ShogiPlayer.js";

export const kifToShogiPlayer = (kif: string): ShogiPlayer => {
  const initialState = createInitialStateByKif(kif);

  const gameStates = executeActions(
    kifToActions(kif),
    initialState
  );

  const history: ShogiPlayer["history"] = {
    gameEndStatus: checkGameEnd(gameStates),
    history: gameStates
  }

  return new ShogiPlayer(
    history
  )
}
