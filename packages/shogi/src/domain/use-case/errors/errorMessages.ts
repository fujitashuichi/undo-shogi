import type { ShogiErrorName } from "./errorName.js";

export const nameMessageMap: Record<ShogiErrorName, string> = {
  SELF_CHECKED: "自殺手です。",
  CHECK_MATED: "詰んでいます。",
  DROP_PAWN_MATE: "打ち歩詰めのため打てません。",
  GAME_ALREADY_ENDED: "終局しています。",

  DOUBLE_PAWN: "二歩です。",

  FORCED_PROMOTION: "その手は必ず成る必要があります。",
  INVALID_PROMOTION: "その成りは成立しません。",

  MOVE_TO_INVALID_SQUARE: "そこには指せません。",
  DROP_TO_INVALID_SQUARE: "そこには打てません。",

  MOVE_UNDEFINED_PIECE: "動かす駒を選択してください。",
  DROP_UNDEFINED_PIECE: "動かす駒を選択してください。",

  MOVE_OPPONENT_SIDES_PIECE: "相手の駒です。",
  LEAP_RESTRICTION: "他の駒を追い越すことは出来ません。",
  INVALID_UNDO: "待ったできない局面です。",
  UNSUPPORTED_KIF: "サポートされていないKIFファイルです。",

  ZERO_LENGTH_HISTORY:   "予期しないエラーが発生しました。",
  INVALID_MOTION_VECTOR: "予期しないエラーが発生しました。",
  INVALID_PROPERTY:      "予期しないエラーが発生しました。",
  OUT_OF_BOARD:          "予期しないエラーが発生しました。",
  INTERNAL_ERROR:        "予期しないエラーが発生しました。"
}
