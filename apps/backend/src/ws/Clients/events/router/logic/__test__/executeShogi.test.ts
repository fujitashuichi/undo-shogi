import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { ShogiRoom } from "../../../../../Groups/ShogiRoom";
import { executeShogi } from "../shogi/executeShogi";
import { executeExampleMove } from "./lib/executeExampleMove";
import type { ClientShogiMessage } from "@packages/ws-messages";

describe("executeShogi", () => {
  let shogiRoom: ShogiRoom | null = null;
  let onTick: Mock | null = null;
  let onTimeUp: Mock | null = null;
  let onResult: Mock | null = null;

  beforeEach(() => {
    onTick = vi.fn();
    onTimeUp = vi.fn();
    onResult = vi.fn();

    shogiRoom = new ShogiRoom({
      handicap: "hirate",
      timerOptions: {
        remainingSeconds: {
          Sente: 10 * 60,
          Gote:  10 * 60
        },
        onTick,
        onTimeUp
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    shogiRoom = null;
    onTick = null;
    onTimeUp = null;
    onResult = null;
  });


  it("startGameの正常系", () => {
    const message: ClientShogiMessage = {
      type: "shogi",
      command: "startGame"
    }
    executeShogi(onResult!, shogiRoom!, message);

    expect(onResult).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true
      })
    )
  });

  it("stopGameの正常系", () => {
    const message: ClientShogiMessage = {
      type: "shogi",
      command: "stopGame"
    }
    executeShogi(onResult!, shogiRoom!, message);

    expect(onResult).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true
      })
    )
  });

  it("undoの正常系", () => {
    // undoするために盤面を進めておく
    executeExampleMove(shogiRoom!);

    const message: ClientShogiMessage = {
      type: "shogi",
      command: "undo"
    }
    executeShogi(onResult!, shogiRoom!, message);

    expect(onResult).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true
      })
    )
  });

  it("movePieceの正常系", () => {
    executeShogi(
      () => {},
      shogiRoom!,
      { type: "shogi", command: "startGame" }
    );

    const message: ClientShogiMessage = {
      type: "shogi",
      command: "movePiece",
      body: { from: { file: 7, rank: 7 }, to: { file: 7, rank: 6 }, promote: false }
    }
    executeShogi(onResult!, shogiRoom!, message);

    expect(onResult).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true
      })
    )
  });

  it("dropPieceの正常系", () => {
    executeExampleMove(shogiRoom!);

    const message: ClientShogiMessage = {
      type: "shogi",
      command: "dropPiece",
      body: { to: { file: 8, rank: 7 }, kind: "Pawn" }
    }
    executeShogi(onResult!, shogiRoom!, message);

    expect(onResult).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true
      })
    )
  });
});
