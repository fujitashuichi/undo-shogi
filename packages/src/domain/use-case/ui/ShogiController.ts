import { Game } from "../../entities/Game/Game.js";
import { Timer } from "../../entities/Timer/Timer.js";
import type { Position } from "../../entities/types/algebraic.types.js";
import type { NormalPieceKind } from "../../entities/types/piece.types.js";
import { domainErrorHandler } from "../errors/domainErrorHandler.js";
import { initializers } from "./initializers.js";


export class ShogiController {
  private _game: Game;
  private _timer: Timer;

  constructor(
    game: Game,
    timer: Timer
  ) {
    this._game = game;
    this._timer = timer;
  }


  public get status() {
    return domainErrorHandler(() => {
      const history = this._game.status.history;

      return {
        gameEndStatus: this._game.status.gameEndStatus,
        remainingSeconds: this._timer.remainingSeconds,
        history: history.map(gameState => {
          return {
            board: gameState.board,
            hands: gameState.hands
          }
        })
      };
    });
  }


  static readonly init = {
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
      this._timer.turnSide();
      this._game = this._game.movePiece(currentPos, nextPos, promote);
    });
  }

  public readonly dropPiece = (position: Position, kind: NormalPieceKind) => {
    domainErrorHandler(() => {
      this._timer.turnSide();
      this._game = this._game.dropPiece(position, kind);
    });
  }

  public readonly undo = () => {
    domainErrorHandler(() => {
      this._timer.undo();
      this._game = this._game.undo();
    });
  }
}
