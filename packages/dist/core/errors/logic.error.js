const messages = {
    OUT_OF_BOARD: "ロジックが盤面座標の範囲外です"
};
export class LogicError extends Error {
    type;
    constructor(type) {
        super();
        this.type = type;
        this.name = "LogicError";
        this.message = messages[type];
    }
}
//# sourceMappingURL=logic.error.js.map