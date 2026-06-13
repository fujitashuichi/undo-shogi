import { Timer } from "./domain/entities/Timer/Timer.js";
import type { Prettify } from "./tools/types/prettify.js";


export { ShogiController } from "./domain/use-case/ShogiController.js";
export { DomainError } from "./domain/use-case/errors/domainError.js";


export type { Side } from "./domain/entities/types/players.types.js";
export type { Handicap } from "./domain/entities/types/handicap.types.js";
export type { NormalPieceKind, PieceKind, PromotablePieceKind } from "./domain/entities/types/piece.types.js";


// UI側で使用できる時計設定を制限する
type Options = ConstructorParameters<typeof Timer>[0];
export type ShogiTimerOptions = Pick<Options, "remainingSeconds" | "onTick" | "onTimeUp">



// その他
export { logger } from "./tools/logger/index.js"
export type { Prettify };
