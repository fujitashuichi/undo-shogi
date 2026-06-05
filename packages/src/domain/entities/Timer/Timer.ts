import type { Side } from "../types/players.types.js";

type RemainingSeconds = Record<Side, number>;

export class Timer {
  private timerId: ReturnType<typeof setInterval> | null = null;
  private _remaining: RemainingSeconds;

  constructor (
    remainingSeconds: RemainingSeconds,
    private currentSide: Side = "Sente",

    // ↓ 外部からの時間観測
    public readonly onTimeUp?: (side: Side) => any,
    public readonly onTick?: () => any
  ) {
    this._remaining = { ...remainingSeconds };
  }


  public get remainingSeconds(): RemainingSeconds {
    return { ...this._remaining };
  }


  public startTimer = () => {
    if (this.timerId) {
      this.stopTimer();
    }

    this.timerId = setInterval(
      () => {
        this._remaining[this.currentSide]--;


        if (this.onTick) this.onTick();

        if (this._remaining[this.currentSide] <= 0) {
          this.stopTimer();

          if (this.onTimeUp) this.onTimeUp(this.currentSide);
        }
      },
      1000
    )
  }


  public readonly stopTimer = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
    };
    this.timerId = null;
  }

  public readonly turnSide = () => {
    this.stopTimer();
    this.currentSide = this.currentSide === "Sente" ? "Gote" : "Sente";
    this.startTimer();
  }

  public restart = () => {
    if (!this.timerId) {
      this.startTimer();
    }
  }
}

new Timer({ Sente: 200, Gote: 300 })