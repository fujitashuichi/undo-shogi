import { z } from "zod";


export const movementErrorNameSchema = z.enum([
  "MOVE_UNDEFINED_PIECE", "MOVE_TO_INVALID_SQUARE",
  "DROP_UNDEFINED_PIECE", "DROP_TO_INVALID_SQUARE",
  "INVALID_PROMOTION", "FORCED_PROMOTION",
  "SELF_CHECKED", "CHECK_MATED", "DROP_PAWN_MATE",
  "MOVE_OPPONENT_SIDES_PIECE"
]);
type ErrorName = z.infer<typeof movementErrorNameSchema>;


const messages: Record<ErrorName, string> = {
  MOVE_UNDEFINED_PIECE: "動かす駒を選択してください。",
  MOVE_TO_INVALID_SQUARE: "そこには指せません。",
  DROP_TO_INVALID_SQUARE: "そこには打てません。",
  INVALID_PROMOTION: "その成りは成立しません。",
  FORCED_PROMOTION: "その手は必ず成る必要があります。",
  SELF_CHECKED: "自殺手です。",
  CHECK_MATED: "詰んでいます。",
  DROP_PAWN_MATE: "打ち歩詰めのため打てません。",
  DROP_UNDEFINED_PIECE: "予期しないエラーが発生しました。",
  MOVE_OPPONENT_SIDES_PIECE: "相手の駒です。"
}


export class MovementError extends Error {
  constructor (
    public readonly errorName: ErrorName
  ) {
    super();
    this.name = "MovementError";
    this.message = messages[errorName]
  }
}
