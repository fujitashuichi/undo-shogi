import { describe, it, vi } from "vitest";
import { Timer } from "../domain/entities/Timer/Timer";

describe("sandBox", () => {
  it("Timerのコールバック関数を実演", () => {
    vi.useFakeTimers();

    const timer = new Timer({
      remainingSeconds: {
        Sente: 3,
        Gote:  3
      },

      onTick: (side, remaining) => {
        console.log(`${side}: ${remaining[side]} s`);
      },
      onTimeUp: (side) => {
        console.log(`${side} lose...`);
      }
    });

    timer.startTimer();
    vi.advanceTimersByTime(5000);

    timer.stopTimer();

    vi.useRealTimers();
  });
});
