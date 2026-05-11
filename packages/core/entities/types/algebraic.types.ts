export type Position = {
  x: number,
  y: number
}

export type PieceVectors = {
  dx: number,
  dy: number,
  infinity: boolean
}[]


export type PieceMotion = {
  vectors: PieceVectors
}
