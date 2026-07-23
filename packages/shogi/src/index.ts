export type { Side } from "./schemas/primitive/players.js";
export type { Position } from "./schemas/primitive/algebraic.js";
export type { Handicap } from "./schemas/primitive/handicap.js";

export { normalPieceKindSchema, pieceKindSchema, promotablePieceKindSchema, promotedPieceKindSchema } from "./schemas/primitive/piece.js";
export type { NormalPieceKind, PieceKind, PromotablePieceKind, PromotedPieceKind } from "./schemas/primitive/piece.js";


export { ShogiController } from "./domain/use-case/ShogiController.js";
export { ShogiError } from "./domain/use-case/errors/ShogiError.js";
export { shogiErrorNameSchema } from "./domain/use-case/errors/errorName.js";

export { shogiStatusSchema, type ShogiStatus } from "./schemas/structural/shogiController.js"


// UI側で使用できる時計設定を制限する
import { Timer } from "./domain/entities/Timer/Timer.js";

type Options = ConstructorParameters<typeof Timer>[0];
export type ShogiTimerOptions = Pick<Options, "remainingSeconds" | "onTick" | "onTimeUp">
