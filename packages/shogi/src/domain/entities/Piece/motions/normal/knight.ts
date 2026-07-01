import type { ShogiPiece } from "../../Piece.js";

const vectors: ShogiPiece["motion"]["vectors"] = [
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


export const knightMotion: ShogiPiece["motion"] = {
  vectors
}
