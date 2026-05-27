import type { LogicError } from "../../core/errors/logic.error.js";
import type { MovementError } from "../../core/errors/movement.errors.js";
import type { PieceError } from "../../core/errors/piece.error.js";
import type { ShogiRulesError } from "../../core/errors/shogiRules.error.js";
import type { KifError } from "../kif-formatter/errors/kif.error.js";

class DomainError extends Error {
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
;


const unexpected = "予期しないエラーが発生しました。";

const messageMap: Record<Errors["type"], string> = {
  CHECK_MATED: "詰んでいます。",
  DOUBLE_PAWN: "二歩です。",
  DROP_PAWN_MATE: "打ち歩詰めのため打てません。",
  FORCED_PROMOTION: "その手は必ず成る必要があります。",
  DROP_TO_INVALID_SQUARE: "そこには打てません。",
  DROP_UNDEFINED_PIECE: unexpected,
  INVALID_MOTION_VECTOR: unexpected,
  INVALID_PROMOTION: "その成りは成立しません。",
  INVALID_PROPERTY: unexpected,
  LEAP_RESTRICTION: "他の駒を追い越すことは出来ません。",
  MOVE_OPPONENT_SIDES_PIECE: "相手の駒です。",
  MOVE_TO_INVALID_SQUARE: "そこには指せません。",
  MOVE_UNDEFINED_PIECE: "動かす駒を選択してください。",
  OUT_OF_BOARD: unexpected,
  UNSUPPORTED_KIF: "サポートされていないKIFファイルです。",
  SELF_CHECKED: "自殺手です。"
}


export const convertToDomainError = (err: Errors) => {
  return new DomainError(err.type, messageMap[err.type]);
}
