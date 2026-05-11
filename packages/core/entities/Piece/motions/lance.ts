import type { PieceMotion, PieceVectors } from "../../types/algebraic.types.js";

const vectors: PieceVectors = [
  {
    dx: 0,
    dy: 1,
    infinity: true
  }
];


export const pawnMotion: PieceMotion = {
  vectors
}
