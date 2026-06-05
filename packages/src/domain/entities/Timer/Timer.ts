import type { Side } from "../types/players.types.js";

type RemainingSeconds = Record<Side, number>;

type Options = {
  remainingSeconds: RemainingSeconds,
  currentSide?: Side,

  // ↓ 外部からの時間観測
  onTimeUp?: (side: Side) => any,
  onTick?: (side: Side, remainingSeconds: RemainingSeconds) => any
}

export class Timer {
  private timerId: ReturnType<typeof setInterval> | null = null;

  private _remaining: RemainingSeconds;
  private currentSide: Side;
  public readonly onTimeUp: Options["onTimeUp"];
  public readonly onTick:   Options["onTick"]

  constructor (
    options: Options
  ) {
    this._remaining = { ...options.remainingSeconds };
    this.currentSide = options.currentSide ?? "Sente";

    this.onTimeUp = options.onTimeUp;
    this.onTick   = options.onTick;
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


        if (this.onTick) this.onTick(this.currentSide, this.remainingSeconds);

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
