import { GameState } from "../../../entities/GameState/GameState.js";
export const createNewGame = {
    hirate: () => {
        return {
            gameEndStatus: {
                ended: false
            },
            history: [GameState.init.hirate()]
        };
    }
};
//# sourceMappingURL=createNewGame.js.map