const messages = {
    DOUBLE_PAWN: "2歩です"
};
export class ShogiRulesError extends Error {
    type;
    constructor(type) {
        super();
        this.type = type;
        this.name = "ShogiRulesError";
        this.message = messages[type];
    }
}
//# sourceMappingURL=shogiRules.error.js.map