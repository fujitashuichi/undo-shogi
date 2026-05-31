import { GameState } from "../../entities/GameState/GameState.js";
import { executeActions } from "../../service/kif-commands/executeActions.js";
import { kifToActions } from "../../service/kif-formatter/kifToActions.js";
import { checkGameEnd } from "./checkGameEnd.js";
export const readKif = (kif) => {
    const actions = kifToActions(kif);
    const gameStates = executeActions(actions, GameState.init.hirate());
    const gameEndStatus = checkGameEnd(gameStates);
    return {
        gameEndStatus,
        history: gameStates
    };
};
//# sourceMappingURL=readKif.js.map