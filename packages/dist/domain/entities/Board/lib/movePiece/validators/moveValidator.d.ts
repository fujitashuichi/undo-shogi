import type { Position } from "../../../../types/algebraic.types.js";
import type { Board } from "../../../Board.js";
import type { Side } from "../../../../types/piece.types.js";
export declare const moveValidator: {
    assertCanMove: (board: Board, current: Position, next: Position, promote: boolean) => void;
    canMove: (board: Board, current: Position, next: Position, promote: boolean) => boolean;
    assertCanPromote: (side: Side, current: Position, next: Position) => void;
};
//# sourceMappingURL=moveValidator.d.ts.map