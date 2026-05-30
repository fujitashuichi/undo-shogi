import { LogicError } from "../../entities/errors/logic.error.js";
import { MovementError } from "../../entities/errors/movement.errors.js";
import { PieceError } from "../../entities/errors/piece.error.js";
import { ShogiRulesError } from "../../entities/errors/shogiRules.error.js";
import { KifError } from "../../service/kif-formatter/errors/kif.error.js";
import type { PlayError } from "../logic/errors/playError.js";

export class DomainError extends Error {
  constructor (name: string, message: string) {
    super();
    this.name = name;
    this.message = message;
  }
}


type Errors =
  | LogicError
  | MovementError
  | PieceError
  | ShogiRulesError
  | KifError
  | PlayError
;


const unexpectedErrorMessage = "予期しないエラーが発生しました。";

const messageMap: Record<Errors["type"], string> = {
  CHECK_MATED: "詰んでいます。",
  DOUBLE_PAWN: "二歩です。",
  DROP_PAWN_MATE: "打ち歩詰めのため打てません。",
  FORCED_PROMOTION: "その手は必ず成る必要があります。",
  DROP_TO_INVALID_SQUARE: "そこには打てません。",
  DROP_UNDEFINED_PIECE: unexpectedErrorMessage,
  INVALID_MOTION_VECTOR: unexpectedErrorMessage,
  INVALID_PROMOTION: "その成りは成立しません。",
  INVALID_PROPERTY: unexpectedErrorMessage,
  LEAP_RESTRICTION: "他の駒を追い越すことは出来ません。",
  MOVE_OPPONENT_SIDES_PIECE: "相手の駒です。",
  MOVE_TO_INVALID_SQUARE: "そこには指せません。",
  MOVE_UNDEFINED_PIECE: "動かす駒を選択してください。",
  OUT_OF_BOARD: unexpectedErrorMessage,
  UNSUPPORTED_KIF: "サポートされていないKIFファイルです。",
  SELF_CHECKED: "自殺手です。",
  ZERO_LENGTH_HISTORY: "指し手の履歴が空です。",
  INVALID_UNDO: "待ったできない局面です",
  GAME_ALREADY_ENDED: "終局しています。"
}


export const convertToDomainError = (err: unknown) => {
  if (
    err instanceof LogicError ||
    err instanceof MovementError ||
    err instanceof PieceError ||
    err instanceof ShogiRulesError ||
    err instanceof KifError ||
    err instanceof PieceError
  ) {
    return new DomainError(err.type, messageMap[err.type]);
  }

  return new DomainError("INTERNAL_ERROR", unexpectedErrorMessage);
}
