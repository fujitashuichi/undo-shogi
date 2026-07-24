import type { ShogiRoom } from "../../../../../../Groups/ShogiRoom";
import { executeShogi } from "../../shogi/executeShogi";

export const executeExampleMove = (shogiRoom: ShogiRoom) => {
  executeShogi(
    () => {},
    shogiRoom,
    { type: "shogi", command: "startGame" }
  );

  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 7, rank: 7 }, to: { file: 7, rank: 6 }, promote: false }
    }
  );
  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 3, rank: 3 }, to: { file: 3, rank: 4 }, promote: false }
    }
  );
  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 2, rank: 7 }, to: { file: 2, rank: 6 }, promote: false }
    }
  );
  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 8, rank: 3 }, to: { file: 8, rank: 4 }, promote: false }
    }
  );
  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 2, rank: 6 }, to: { file: 2, rank: 5 }, promote: false }
    }
  );
  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 8, rank: 4 }, to: { file: 8, rank: 5 }, promote: false }
    }
  );

  // 先手から歩交換
  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 2, rank: 5 }, to: { file: 2, rank: 4 }, promote: false }
    }
  );
  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 2, rank: 3 }, to: { file: 2, rank: 4 }, promote: false }
    }
  );
  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 2, rank: 8 }, to: { file: 2, rank: 4 }, promote: false }
    }
  );

  // 後手から歩交換
  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 8, rank: 5 }, to: { file: 8, rank: 6 }, promote: false }
    }
  );
  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 8, rank: 7 }, to: { file: 8, rank: 6 }, promote: false }
    }
  );
  executeShogi(
    () => {},
    shogiRoom,
    {
      type: "shogi", command: "movePiece",
      body: { from: { file: 8, rank: 2 }, to: { file: 8, rank: 6 }, promote: false }
    }
  );
}
