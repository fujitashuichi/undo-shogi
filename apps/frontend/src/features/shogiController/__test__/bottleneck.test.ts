import { describe, expect, it } from "vitest";
import { sampleKif } from "./sampleKif";
import { renderHook } from "@testing-library/react";
import { useShogiController } from "../useShogiController";
import { playShogi } from "../playShogi";

describe("bottleneck test", () => {
  const { result } = renderHook(() => useShogiController());

  it("106手目の指し手に10msかからない", () => {
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

    console.info(`106手目の処理に ${duration}ms かかりました。`)

    playShogi(controller).stopMatch();

    result.current.removeController(id);
  });
});
