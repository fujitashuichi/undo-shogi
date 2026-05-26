import { logger } from "../../../../tools/index.js";
import { PieceError } from "../../../errors/piece.error.js";
import { PromotedPieceKindSchema } from "../../types/piece.types.js";
export const pieceValidator = (isPromoted, kind) => {
    if (isPromoted) {
        const isPromotedKind = PromotedPieceKindSchema.safeParse(kind).success;
        if (!isPromotedKind) {
            logger.fatal(`isPromoted === true ですが、${kind} は成り駒ではありません。`);
            throw new PieceError("INVALID_PROPERTY");
        }
    }
};
//# sourceMappingURL=pieceValidator.js.map