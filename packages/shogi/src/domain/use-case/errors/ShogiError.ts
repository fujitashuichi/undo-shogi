import { GameError } from "../../entities/errors/gameError.js";
import { KifError } from "../../entities/errors/kifError.js";
import { LogicError } from "../../entities/errors/logicError.js";
import { MovementError } from "../../entities/errors/movementErrors.js";
import { PieceError } from "../../entities/errors/pieceError.js";
import { RulesError } from "../../entities/errors/rulesError.js";
import { TimerError } from "../../entities/errors/timerError.js";
import { nameMessageMap } from "./errorMessages.js";
import type { ShogiErrorName } from "./errorName.js";


export class ShogiError extends Error {
  constructor (
    readonly errorName: ShogiErrorName,
  ) {
    super();
    this.name = "ShogiError";
    this.message = nameMessageMap[errorName];
  }
}



export const convertToShogiError = (err: unknown) => {
  if (
    err instanceof LogicError ||
    err instanceof MovementError ||
    err instanceof PieceError ||
    err instanceof RulesError ||
    err instanceof GameError ||
    err instanceof KifError ||
    err instanceof PieceError ||
    err instanceof TimerError
  ) {
    return new ShogiError(err.errorName);
  }

  return new ShogiError("INTERNAL_ERROR");
}
