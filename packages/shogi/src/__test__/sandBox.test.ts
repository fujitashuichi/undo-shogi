import { describe, expect, it, vi } from "vitest";
import { Timer } from "../domain/entities/Timer/Timer";

describe("sandBox", () => {
  it("Timerのコールバック関数が過不足なく呼ばれる", () => {
    vi.useFakeTimers();

    let tickCount = 0;
    let timeUpCount = 0;

    const timer = new Timer({
      remainingSeconds: {
        Sente: 3,
        Gote:  3
      },

      onTick: (_side, _remaining) => {
        tickCount++;
      },
      onTimeUp: (_side) => {
        timeUpCount++;
      }
    });

    timer.startTimer();
    vi.advanceTimersByTime(5000);

    timer.stopTimer();

    vi.useRealTimers();

    expect(tickCount).toBe(3);
    expect(timeUpCount).toBe(1);
  });
});
