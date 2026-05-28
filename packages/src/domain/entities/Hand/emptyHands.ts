import { Hands } from "./Hands.js";

const pieceRecord: Hands["pieceRecord"] = {
  Sente: {
    King: 0, Gold: 0, Silver: 0, Knight: 0, Lance: 0,
    Bishop: 0, Rook: 0,
    Pawn: 0
  },
  Gote: {
    King: 0, Gold: 0, Silver: 0, Knight: 0, Lance: 0,
    Bishop: 0, Rook: 0,
    Pawn: 0
  }
}

export const emptyHands: Hands = new Hands(pieceRecord);