const messageMap = {
    ZERO_LENGTH_HISTORY: "指し手の履歴が空です。",
    INVALID_UNDO: "そのundo操作は不可能です。",
    GAME_ALREADY_ENDED: "既に終局しています。"
};
export class PlayError extends Error {
    type;
    constructor(type) {
        super();
        this.type = type;
        this.name = "PlayError";
        this.message = messageMap[type];
    }
}
//# sourceMappingURL=playError.js.map