import { isInsideRange } from "../../../../../tools/math/isInsideRange.js";
import { boardConfig } from "../../../config/boardConfig.js";
const boardSize = boardConfig.boardSize;
const promotionZone = boardConfig.promotionZone;
const promotionZoneRange = (side) => {
    if (side === "Sente") {
        return [0, promotionZone - 1];
    }
    return [boardSize - 1, boardSize - promotionZone];
};
export const isInPromotionZone = (side, position) => {
    if (!isInsideRange(position.y, promotionZoneRange(side))) {
        return false;
    }
    ;
    return true;
};
//# sourceMappingURL=isInPromotionZone.js.map