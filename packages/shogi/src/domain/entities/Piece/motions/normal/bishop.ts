import type { ShogiPiece } from "../../Piece.js";

const vectors: ShogiPiece["motion"]["vectors"] = [
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


export const bishopMotion: ShogiPiece["motion"] = {
  vectors
}
