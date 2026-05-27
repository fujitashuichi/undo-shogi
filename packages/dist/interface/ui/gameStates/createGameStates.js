import { hirateBoard } from "../../../core/entities/Board/hirateBoard.js";
import { GameState } from "../../../core/entities/GameState/GameState.js";
import { emptyHands } from "../../../core/entities/Hand/__mock__/emptyHands.js";
import { executeActions } from "../../../use-case/kif-commands/executeActions.js";
import { kifToActions } from "../../../use-case/kif-formatter/kifToActions.js";
import { convertToDomainError } from "../../errors/domain.error.js";
export const createGameStates = {
    fromKif: (kif, initialState) => {
        try {
            const actions = kifToActions(kif);
            const gameStates = executeActions(actions, initialState);
            return {
                success: true,
                gameStates
            };
        }
        catch (err) {
            return {
                success: false,
                error: convertToDomainError(err)
            };
        }
    },
    hirate: () => {
        try {
            const gameState = new GameState(hirateBoard, emptyHands);
            return {
                success: true,
                gameState
            };
        }
        catch (err) {
            return {
                success: false,
                error: convertToDomainError(err)
            };
        }
    }
};
//# sourceMappingURL=createGameStates.js.map