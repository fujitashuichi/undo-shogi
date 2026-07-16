import type { NormalPieceKind } from "@/schemas/primitive/piece.js";
import type { Position } from "@/schemas/primitive/algebraic.js";
import type { Game } from "../entities/Game/Game.js";
import type { Timer } from "../entities/Timer/Timer.js";
import { domainErrorHandler } from "./errors/domainErrorHandler.js";
import { initializers } from "./initializers.js";
import type { ShogiStatus } from "@/schemas/structural/shogiController.js";


export class ShogiController {
  private _game: Game;
  private readonly _timer: Timer;

  constructor(
    game: Game,
    timer: Timer
  ) {
    this._game = game;
    this._timer = timer;
  }


  public get status(): ShogiStatus {
    return domainErrorHandler((): ShogiStatus => {
      const history = this._game.status.history;

      return {
        gameEndStatus: this._game.status.gameEndStatus,
        remainingSeconds: this._timer.remainingSeconds,
        history: history.map(gameState => {
          return {
            board: gameState.board.squares.map(row =>
              row.map(square => square ? { side: square.side, piece: square.kind } : undefined)
            ),
            hands: gameState.hands.pieceRecord
          }
        }),
        currentSide: this._game.status.history.at(-1)!.currentSide
      };
    });
  }


  public static readonly init = {
    ...initializers
  }



  public readonly start = () => {
    domainErrorHandler(() => {
      this._timer.startTimer();
    });
  }
  public readonly stop = () => {
    domainErrorHandler(() => {
      this._timer.stopTimer();
    });
  }


  public readonly movePiece = (currentPos: Position, nextPos: Position, promote: boolean) => {
    domainErrorHandler(() => {
      this._game = this._game.movePiece(currentPos, nextPos, promote);
      this._timer.turnSide();
    });
  }

  public readonly dropPiece = (position: Position, kind: NormalPieceKind) => {
    domainErrorHandler(() => {
      this._game = this._game.dropPiece(position, kind);
      this._timer.turnSide();
    });
  }

  public readonly undo = () => {
    domainErrorHandler(() => {
      this._game = this._game.undo();
      this._timer.undo();
    });
  }
}
