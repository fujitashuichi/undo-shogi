type ErrorTypes = "MOVE_UNDEFINED_PIECE" | "MOVE_TO_INVALID_SQUARE" | "DROP_UNDEFINED_PIECE" | "DROP_TO_INVALID_SQUARE" | "INVALID_PROMOTION" | "FORCED_PROMOTION" | "SELF_CHECKED" | "CHECK_MATED" | "DROP_PAWN_MATE" | "MOVE_OPPONENT_SIDES_PIECE";
export declare class MovementError extends Error {
    readonly type: ErrorTypes;
    constructor(type: ErrorTypes);
}
export {};
//# sourceMappingURL=movement.errors.d.ts.map