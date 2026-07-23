import { DomainError, ShogiController, type Handicap, type NormalPieceKind, type ShogiTimerOptions, type Position } from "@packages/shogi";


type Props = {
  handicap: "hirate" | Handicap,
  timerOptions: ShogiTimerOptions
}

export type ShogiResult =
  | {
    success: false,
    code: DomainError["code"]
  }
  | {
    success: true,
    status: ShogiController["status"],
    message: string
  };


export class ShogiRoom {
  private readonly _controller: ShogiController;


  constructor({
    handicap,
    timerOptions
  }: Props) {
    this._controller = ShogiController.init[handicap](timerOptions);
  }


  public get currentSide() {
    return this._controller.status.currentSide;
  }

  public get status() {
    return this._controller.status;
  }


  public readonly startGame = (): ShogiResult => {
    return this.handlePlay(
      `Start match.`,
      () => this._controller.start()
    );
  }

  public readonly stopGame = (): ShogiResult => {
    return this.handlePlay(
      `Stop match.`,
      () => this._controller.stop()
    );
  }


  public readonly movePiece = (
    currentPos: Position, nextPos: Position, promote: boolean
  ): ShogiResult => {
    return this.handlePlay(
      `${this.currentSide} moved Piece.`,
      () => this._controller.movePiece(currentPos, nextPos, promote)
    )
  }

  public readonly dropPiece = (
    position: Position, piece: NormalPieceKind
  ): ShogiResult => {
    return this.handlePlay(
      `${this.currentSide} dropped Piece.`,
      () => this._controller.dropPiece(position, piece)
    )
  }

  public readonly undo = (): ShogiResult => {
    return this.handlePlay(
      `Undo ${this.currentSide}'s play.`,
      () => this._controller.undo()
    )
  }


  private readonly handlePlay = (
    message: string,
    fn: () => void
  ): ShogiResult => {
    try {
      fn();

      return {
        success: true,
        status: structuredClone(this._controller.status),
        message
      };
    } catch (err) {
      if (!(err instanceof DomainError)) {
        return {
          success: false,
          code: "INTERNAL_ERROR"
        };
      }

      return {
        success: false,
        code: err.code
      };
    }
  }
}
