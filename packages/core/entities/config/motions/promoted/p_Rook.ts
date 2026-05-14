import type { PieceMotion, PieceVectors } from "../types.js";

const vectors: PieceVectors = [
  {
    dx: 0,
    dy: 1,
    infinity: true
  },
  {
    dx: 1,
    dy: 0,
    infinity: true
  },
  {
    dx: 0,
    dy: -1,
    infinity: true
  },
  {
    dx: -1,
    dy: 0,
    infinity: true
  },

  {
    dx: 1,
    dy: 1,
    infinity: false
  },
  {
    dx: 1,
    dy: -1,
    infinity: false
  },
  {
    dx: -1,
    dy: -1,
    infinity: false
  },
  {
    dx: -1,
    dy: 1,
    infinity: false
  }
];


export const p_RookMotion: PieceMotion = {
  vectors
}
