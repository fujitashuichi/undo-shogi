import type { PieceMotion, PieceVectors } from "../types.js";

const vectors: PieceVectors = [
  {
    dx: 0,
    dy: 1,
    infinity: true
  }
];


export const lanceMotion: PieceMotion = {
  vectors
}
