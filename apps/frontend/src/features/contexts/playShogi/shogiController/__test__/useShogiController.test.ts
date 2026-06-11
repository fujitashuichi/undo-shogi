import { describe, it, vi } from "vitest";
import { useShogiController } from "../useShogiController";
import { renderHook } from "@testing-library/react";

describe("useShogiController", () => {
  it("SandBox", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useShogiController());

    const { id, controller } = result.current.createNewController("hirate", {
      remainingSeconds: {
        Sente: 10 * 60,
        Gote:  10 * 60
      },

      onTick: (side, remaining) => {
        const time = remaining[side];

        if (time % 60 === 0) {
          console.log(`${side}: ${time / 60}min remaining.`);
        }
      },

      onTimeUp: (side) => {
        console.log(`${side} lose by timeUp.`);
      }
    });


    controller.start();

    vi.advanceTimersByTime(5000);

    result.current.removeController(id);

    vi.useRealTimers();
  });
});
