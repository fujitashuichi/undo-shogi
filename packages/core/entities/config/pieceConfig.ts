import type { ShogiPiece } from "../Piece/Piece.js";
import type { Side } from "../types/piece.types.js";
import { motionMap } from "./motions/motionMap.js";



const adjustVectors = (side: Side, kind: ShogiPiece["kind"]) => {
  const direction = side === "Sente" ? -1 : 1;
  const vectors = motionMap[kind].vectors;

  return vectors.map(vector => {
    return {
      dx: vector.dx * (direction * -1),
      dy: vector.dy * direction,
      infinity: vector.infinity
    }
  })
};


export const pieceConfig = (side: Side, kind: ShogiPiece["kind"]): PieceConfig => {
  return {
    motion: {
      vectors: adjustVectors(side, kind)
    }
  }
}
