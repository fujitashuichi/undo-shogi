type ErrorTypes = "ZERO_LENGTH_HISTORY" | "INVALID_UNDO" | "GAME_ALREADY_ENDED";
export declare class PlayError extends Error {
    readonly type: ErrorTypes;
    constructor(type: ErrorTypes);
}
export {};
//# sourceMappingURL=playError.d.ts.map