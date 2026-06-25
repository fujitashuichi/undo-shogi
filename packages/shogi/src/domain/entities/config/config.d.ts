interface PieceConfig {
  motion: {
    vectors: {
      dx: number,
      dy: number,
      infinity: boolean
    }[]
  }
}

interface BoardConfig {
  boardSize: number,
  promotionZone: number
}
