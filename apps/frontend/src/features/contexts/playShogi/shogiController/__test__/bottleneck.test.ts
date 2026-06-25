import { describe, expect, it, vi } from "vitest";
import { sampleKif } from "./sampleKif";
import { renderHook } from "@testing-library/react";
import { useShogiController } from "../useShogiController";
import { playShogi } from "../playShogi";
import { logger } from "@packages/tools";
import { styleText } from "node:util";

describe("bottleneck test", () => {
  const { result } = renderHook(() => useShogiController());


  /**
   * 処理時間は環境によって大きく変わるため参考までに
   */

  it("106手目の指し手に10msかからない", () => {
    vi.spyOn(logger, "warn").mockImplementation(() => {});

    const { id, controller } = result.current.createNewController_ByKif({
        remainingSeconds: {
          Sente: 10 * 60,
          Gote:  10 * 60
        }
      },
      sampleKif.slice(0, -2)
    );

    playShogi(controller).startMatch();

    const start = performance.now();
    playShogi(controller).movePiece([3, 8], [2, 8], false);
    const duration = performance.now() - start;

    expect(duration).toBeLessThan(10);
    expect(controller.status.history.length).toBe(106 + 1); // 初期局面が含まれるため、106手目のlengthは107

    console.log(styleText(["bgYellow", "red"], " info "), `106手目の処理に ${duration}ms かかりました。`)

    playShogi(controller).stopMatch();

    result.current.removeController(id);

    vi.restoreAllMocks();
  });
});
