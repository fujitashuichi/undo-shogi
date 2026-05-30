import type { Board } from "../../../Board/Board.js";
import { MovementError } from "../../../errors/movement.errors.js";
import type { Side } from "../../../types/piece.types.js";
import { isChecked } from "./isChecked.js";


export const violateSelfCheck = (nextBoard: Board, side: Side) => {
  if (isChecked(nextBoard, side)) {
    throw new MovementError("SELF_CHECKED");
  }

  return nextBoard;
}
