import type { PieceMotion, PieceVectors } from "../../types/algebraic.types.js";

const vectors: PieceVectors = [
  {
    dx: 1,
    dy: 2,
    infinity: false
  },
  {
    dx: -1,
    dy: 2,
    infinity: false
  },
];


export const pawnMotion: PieceMotion = {
  vectors
}
