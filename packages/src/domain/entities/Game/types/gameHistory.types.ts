export type GameEndStatus =
  | {
    ended: false
  }
  | {
    ended: true,
    winner: "Sente" | "Gote" | "Draw"
  }
