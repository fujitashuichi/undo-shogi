import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ShogiController } from "../ShogiController.js";


describe("ShogiController: callback関数の動作テスト", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  })
  afterEach(() => {
    vi.useRealTimers();
  })


  it("onTickは、カウントダウンの度に実行される", () => {
    const onTickMock = vi.fn();

    const controller = ShogiController.init.kyoOchi({
      remainingSeconds: {
        Sente: 15 * 60,
        Gote: 30 * 60
      },
      onTick: (side, remaining) => {
        onTickMock();
      }
    });

    controller.start();
    vi.advanceTimersByTime(2000);

    expect(onTickMock).toHaveBeenCalledTimes(2);
  });


  it("onTimeUpは、時間切れの際に実行される", () => {
    const onTickMock = vi.fn();

    const controller = ShogiController.init.kyoOchi({
      remainingSeconds: {
        Sente: 3,
        Gote: 3
      },
      onTimeUp: (side) => {
        onTickMock();
      }
    });

    controller.start();
    vi.advanceTimersByTime(3000);

    expect(onTickMock).toHaveBeenCalledTimes(1);
  });
});
