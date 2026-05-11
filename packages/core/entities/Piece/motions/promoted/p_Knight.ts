import type { PieceMotion, PieceVectors } from "../../../types/algebraic.types.js";

const vectors: PieceVectors = [
  {
    dx: 0,
    dy: 1,
    infinity: false
  },
  {
    dx: 1,
    dy: 1,
    infinity: false
  },
  {
    dx: 1,
    dy: 0,
    infinity: false
  },
  {
    dx: 0,
    dy: -1,
    infinity: false
  },
  {
    dx: -1,
    dy: 0,
    infinity: false
  },
  {
    dx: -1,
    dy: 1,
    infinity: false
  }
];


export const p_KnightMotion: PieceMotion = {
  vectors
}
