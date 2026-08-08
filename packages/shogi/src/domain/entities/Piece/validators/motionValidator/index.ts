import type { Board } from "../../../Board/Board.js";
import type { Position } from "@/schemas/primitive/algebraic.js";
import { assertForcedPromotion } from "./assertForcedPromotion.js";
import { violatesLeapRestriction } from "./violateLeapRestriction.js";
import { assertMotionVector } from "./assertMotionVector.js";


export const pieceMotionValidator = (board: Board, current: Position, next: Position, promote: boolean) => {
  assertMotionVector(board, current, next);
  violatesLeapRestriction(board, current, next);
  assertForcedPromotion(board, current, next, promote);
}
