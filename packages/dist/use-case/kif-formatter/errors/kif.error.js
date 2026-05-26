const messageMap = {
    UNSUPPORTED_KIF: "このKIF形式はサポートされていません。"
};
export class KifError extends Error {
    type;
    constructor(type) {
        super();
        this.type = type;
        this.name = "KifError";
        this.message = messageMap[type];
    }
}
//# sourceMappingURL=kif.error.js.map