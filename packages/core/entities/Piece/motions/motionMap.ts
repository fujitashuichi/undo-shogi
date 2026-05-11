import type { PieceMotion } from "../../types/algebraic.types.js";
import type { PieceKind } from "../../types/piece.types.js";
import { bishopMotion, goldMotion, kingMotion, knightMotion, lanceMotion, pawnMotion, rookMotion, silverMotion } from "./normal/index.js";
import { p_BishopMotion, p_KnightMotion, p_LanceMotion, p_PawnMotion, p_RookMotion, p_SilverMotion } from "./promoted/index.js";


export const motionMap: Record<PieceKind, PieceMotion> = {
  King: kingMotion, Gold: goldMotion, Silver: silverMotion, Knight: knightMotion, Lance: lanceMotion,
  Bishop: bishopMotion, Rook: rookMotion,
  Pawn: pawnMotion,

  P_Silver: p_SilverMotion, P_Knight: p_KnightMotion, P_Lance: p_LanceMotion,
  P_Bishop: p_BishopMotion, P_Rook: p_RookMotion,
  P_Pawn: p_PawnMotion
}
