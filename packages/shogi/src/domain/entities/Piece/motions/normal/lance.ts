import type { ShogiPiece } from "../../Piece.js";

const vectors: ShogiPiece["motion"]["vectors"] = [
  {
    dx: 0,
    dy: 1,
    infinity: true
  }
];


export const lanceMotion: ShogiPiece["motion"] = {
  vectors
}
