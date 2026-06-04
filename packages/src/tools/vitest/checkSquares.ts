import type { Board } from "../../domain/entities/Board/Board.js";

export const vitest_checkSquares = {
  sameSquares: (squares_1: Board["squares"], squares_2: Board["squares"]) => squares_1.every((row_1, idx) => {
    // 盤面が同一でも、各駒のidは対局によって変わる。
    // そのため、盤面自体の同一性は以下のように調べる。

    const row_2 = squares_2[idx]!;

    row_1.every((square_1, idx) => {
      const squares_2 = row_2[idx];

      return (
        square_1 === undefined && squares_2 === undefined
      ) || (
        square_1?.kind === squares_2?.kind
      )
    })
  })
}
