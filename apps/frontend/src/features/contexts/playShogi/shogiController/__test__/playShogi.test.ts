// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest";
import { useShogiController } from "../useShogiController";
import { renderHook } from "@testing-library/react";
import { playShogi } from "../playShogi";
import { sampleKif } from "./sampleKif";
import { logger } from "@packages/tools";


describe("playShogi", () => {
  const { result } =  renderHook(() => useShogiController());

  it("一局を通した検証", () => {
    const { id, controller } = result.current.createNewController("hirate", {
      remainingSeconds: {
        Sente: 10 * 60,
        Gote:  10 * 60
      }
    });

    playShogi(controller).startMatch();

    // ↓ ここに一局の動作を記述し、expectアサーションを行う
    playShogi(controller).movePiece([7, 7], [7, 6], false);
    playShogi(controller).movePiece([3, 3], [3, 4], false);
    playShogi(controller).movePiece([8, 8], [2, 2], true);
    playShogi(controller).movePiece([4, 1], [5, 2], false);
    playShogi(controller).dropPiece([4, 2], "Bishop");
    playShogi(controller).movePiece([5, 1], [4, 1], false);
    playShogi(controller).movePiece([2, 2], [3, 1], false);

    expect(controller.status.gameEndStatus).toEqual({
      ended: true,
      winner: "Sente"
    })

    playShogi(controller).stopMatch();
    result.current.removeController(id);
  });


  it("KIFからcontrollerを作成できる", () => {
    vi.spyOn(logger, "warn").mockImplementation(() => {})

    const { id, controller } = result.current.createNewController_ByKif({
        remainingSeconds: {
          Sente: 10 * 60,
          Gote:  10 * 60
        }
      },
      sampleKif
    );

    // サンプル棋譜では後手勝ちで終局している
    expect(controller.status.gameEndStatus).toEqual({
      ended: true,
      winner: "Gote"
    });

    result.current.removeController(id);

    vi.restoreAllMocks();
  });
});
