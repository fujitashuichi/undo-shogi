import { logger } from "../../../tools/index.js";
import { NormalPieceKindSchema, PromotablePieceKindSchema, PromotedPieceKindSchema } from "../types/piece.types.js";
import { pieceValidator } from "./validators/pieceValidator.js";
import { normalKindToPromoted } from "./normalToPromoted.js";
import { promotedKindToNormal } from "./promotedToNormal.js";
import { pieceConfig } from "../config/pieceConfig.js";
export class ShogiPiece {
    side;
    kind;
    id;
    motion;
    isPromoted;
    constructor(side, kind, id = crypto.randomUUID()) {
        this.side = side;
        this.kind = kind;
        this.id = id;
        this.isPromoted = PromotedPieceKindSchema.safeParse(kind).success;
        pieceValidator(this.isPromoted, kind);
        this.motion = pieceConfig(side, kind).motion;
    }
    promote = () => {
        if (this.isPromoted) {
            logger.warn(`${this.kind}は既に成っています。`);
            return this;
        }
        const parsed = PromotablePieceKindSchema.safeParse(this.kind);
        if (!parsed.success) {
            logger.warn(`${this.kind} は成ることが出来ない駒です。`);
            return this;
        }
        const nextKind = normalKindToPromoted(parsed.data);
        return new ShogiPiece(this.side, nextKind, this.id);
    };
    disPromote = () => {
        const kind = this.kind;
        const parseForPromoted = PromotedPieceKindSchema.safeParse(kind);
        if (parseForPromoted.success) {
            return new ShogiPieceNormal(this.side, promotedKindToNormal(parseForPromoted.data), this.id);
        }
        const parseForNormal = NormalPieceKindSchema.safeParse(kind);
        if (parseForNormal.success) {
            return new ShogiPieceNormal(this.side, parseForNormal.data, this.id);
        }
        throw new Error("致命的なエラーが発生しました");
    };
    changeSide = () => {
        logger.trace(`${this.side}の${this.kind}が対局相手に渡りました。`);
        const nextSide = this.side === "Sente" ? "Gote" : "Sente";
        const parsed = PromotedPieceKindSchema.safeParse(this.kind);
        if (parsed.success) {
            const nextKind = promotedKindToNormal(parsed.data);
            return new ShogiPiece(nextSide, nextKind, this.id);
        }
        return new ShogiPiece(nextSide, this.kind, this.id);
    };
}
export class ShogiPieceNormal extends ShogiPiece {
    side;
    kind;
    id;
    constructor(side, kind, id = crypto.randomUUID()) {
        super(side, kind, id);
        this.side = side;
        this.kind = kind;
        this.id = id;
    }
}
//# sourceMappingURL=Piece.js.map