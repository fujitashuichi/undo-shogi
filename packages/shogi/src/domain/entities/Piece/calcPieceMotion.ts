import type { Side } from "@/schemas/primitive/players.js";
import type { PieceKind } from "@/schemas/primitive/piece.js";
import { motionMap } from "./motions/motionMap.js";
import type { ShogiPiece } from "./Piece.js";


export const calcPieceMotion = (side: Side, pieceKind: PieceKind): ShogiPiece["motion"] => {
  const baseMotion = motionMap[pieceKind];
  const direction = side === "Sente" ? -1 : 1;

  const vectors = baseMotion.vectors.map(vector => {
    const dx = vector.dx * (direction * -1);
    const dy = vector.dy * direction;

    return { ...vector, dx, dy };
  });

  return {
    ...baseMotion,
    vectors
  }
}
