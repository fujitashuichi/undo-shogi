import type { PieceMotion, PieceVectors } from "../types.js";

const vectors: PieceVectors = [
  {
    dx: 1,
    dy: 1,
    infinity: true
  },
  {
    dx: 1,
    dy: -1,
    infinity: true
  },
  {
    dx: -1,
    dy: 1,
    infinity: true
  },
  {
    dx: -1,
    dy: -1,
    infinity: true
  }
];


export const bishopMotion: PieceMotion = {
  vectors
}
