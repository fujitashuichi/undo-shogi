import { MovementError } from "../../../../errors/movement.errors.js";
import { isChecked } from "./isChecked.js";
export const violateSelfCheck = (nextBoard, side) => {
    if (isChecked(nextBoard, side)) {
        throw new MovementError("SELF_CHECKED");
    }
    return nextBoard;
};
//# sourceMappingURL=violateSelfCheck.js.map