import { Hands } from "./Hands.js";

const pieceRecord: Hands["pieceRecord"] = {
  Sente: {
    King: 0, Gold: 2, Silver: 2, Knight: 2, Lance: 2,
    Bishop: 1, Rook: 1,
    Pawn: 9
  },
  Gote: {
    King: 0, Gold: 2, Silver: 2, Knight: 2, Lance: 2,
    Bishop: 1, Rook: 1,
    Pawn: 9
  }
}

export const fullHands: Hands =  new Hands(pieceRecord);
