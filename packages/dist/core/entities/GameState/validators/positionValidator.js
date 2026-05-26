import { logger } from "../../../../tools/index.js";
import { LogicError } from "../../../errors/logic.error.js";
import { isInBoard } from "../../lib/positions/isInArea/isInBoard.js";
export const positionValidator = {
    assertInBoard: (x, y) => {
        if (!isInBoard(x, y)) {
            logger.fatal(`{ x: ${x}, y: ${y} } は盤外です。`);
            throw new LogicError("OUT_OF_BOARD");
        }
    }
};
//# sourceMappingURL=positionValidator.js.map