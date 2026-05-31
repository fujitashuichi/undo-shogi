const messages = {
    INVALID_PROPERTY: "駒の状態が不正です",
    INVALID_MOTION_VECTOR: "移動ベクトルが不正です",
    LEAP_RESTRICTION: "他の駒の追い越しはできません"
};
export class PieceError extends Error {
    type;
    constructor(type) {
        super();
        this.type = type;
        this.name = "PieceError";
        this.message = messages[type];
    }
}
//# sourceMappingURL=piece.error.js.map