import { DomainError, ShogiController, type Handicap, type NormalPieceKind, type ShogiTimerOptions, type Side } from "@packages";
import type { WsClient } from "../Clients/WsClient";
import type { Position } from "../../../../packages/dist/domain/entities/types/algebraic.types";


type Props = {
  handicap: "hirate" | Handicap,
  timerOptions: ShogiTimerOptions
}

type PlayResult =
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


  public readonly startMatch = (): PlayResult => {
    return this.handlePlay(
      `Start match.`,
      () => this._controller.start()
    );
  }

  public readonly stopMatch = (): PlayResult => {
    return this.handlePlay(
      `Stop match.`,
      () => this._controller.stop()
    );
  }


  public readonly movePiece = (
    currentPos: Position, nextPos: Position, promote: boolean
  ): PlayResult => {
    return this.handlePlay(
      `${this.currentSide} moved Piece.`,
      () => this._controller.movePiece(currentPos, nextPos, promote)
    )
  }

  public readonly dropPiece = (
    position: Position, piece: NormalPieceKind
  ): PlayResult => {
    return this.handlePlay(
      `${this.currentSide} dropped Piece.`,
      () => this._controller.dropPiece(position, piece)
    )
  }

  public readonly undo = (): PlayResult => {
    return this.handlePlay(
      `Undo ${this.currentSide}'s play.`,
      () => this._controller.undo()
    )
  }


  private readonly handlePlay = (
    message: string,
    fn: () => void
  ): PlayResult => {
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
