import { boardConfig } from "../../../entities/config/boardConfig.js";
const boardSize = boardConfig.boardSize;
export const convertPosition = {
    kifToLogicPosition: (kifPos) => {
        return {
            x: boardSize - kifPos.x,
            y: kifPos.y - 1
        };
    },
    logicToKifPosition: (logicPos) => {
        return {
            x: boardSize - logicPos.x,
            y: logicPos.y + 1
        };
    }
};
//# sourceMappingURL=convertPosition.js.map