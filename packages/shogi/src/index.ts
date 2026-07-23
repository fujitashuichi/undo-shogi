export type { Side } from "./schemas/primitive/players.js";
export type { Position } from "./schemas/primitive/algebraic.js";
export type { Handicap } from "./schemas/primitive/handicap.js";

export { normalPieceKindSchema, pieceKindSchema, promotablePieceKindSchema, promotedPieceKindSchema } from "./schemas/primitive/piece.js";
export type { NormalPieceKind, PieceKind, PromotablePieceKind, PromotedPieceKind } from "./schemas/primitive/piece.js";


export { ShogiController } from "./domain/use-case/ShogiController.js";
export { DomainError } from "./domain/use-case/errors/domainError.js";
export { shogiErrorMessageSchema } from "./schemas/primitive/error.js";

export { shogiStatusSchema, type ShogiStatus } from "./schemas/structural/shogiController.js"


// UI側で使用できる時計設定を制限する
import { Timer } from "./domain/entities/Timer/Timer.js";

type Options = ConstructorParameters<typeof Timer>[0];
export type ShogiTimerOptions = Pick<Options, "remainingSeconds" | "onTick" | "onTimeUp">
