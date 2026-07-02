import type { PieceKind } from "@/schemas/primitive/piece.js";

export const codeToKifPieceMap: Record<PieceKind, string> = {
  King: "玉", Gold: "金", Silver: "銀", Knight: "桂", Lance: "香",
  Bishop: "角", Rook: "飛", Pawn: "歩",
  P_Silver: "成銀", P_Knight: "成桂", P_Lance: "成香",
  P_Pawn: "と", P_Bishop: "馬", P_Rook: "龍"
};
