import type { ShogiPiece } from "../../Piece.js";

const vectors: ShogiPiece["motion"]["vectors"] = [
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


export const goldMotion: ShogiPiece["motion"] = {
  vectors
}
