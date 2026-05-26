type ErrorTypes = "INVALID_PROPERTY" | "INVALID_MOTION_VECTOR" | "LEAP_RESTRICTION";
export declare class PieceError extends Error {
    readonly type: ErrorTypes;
    constructor(type: ErrorTypes);
}
export {};
//# sourceMappingURL=piece.error.d.ts.map