import { z } from "zod";


export const shogiErrorMessageSchema = z.enum([
  "予期しないエラーが発生しました。",
  "詰んでいます。",
  "二歩です。",
  "打ち歩詰めのため打てません。",
  "その手は必ず成る必要があります。",
  "そこには打てません。",
  "その成りは成立しません。",
  "他の駒を追い越すことは出来ません。",
  "相手の駒です。",
  "そこには指せません。",
  "動かす駒を選択してください。",
  "サポートされていないKIFファイルです。",
  "自殺手です。",
  "指し手の履歴が空です。",
  "待ったできない局面です",
  "終局しています。"
]);
export type ShogiErrorMessage = z.infer<typeof shogiErrorMessageSchema>;
