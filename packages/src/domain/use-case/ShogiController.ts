import type { FixedLengthArray } from "../../tools/index.js";
import type { Board } from "../entities/Board/Board.js";
import { Game } from "../entities/Game/Game.js";
import type { GameState } from "../entities/GameState/GameState.js";
import { Timer } from "../entities/Timer/Timer.js";
import type { Position } from "../entities/types/algebraic.types.js";
import type { NormalPieceKind, PieceKind } from "../entities/types/piece.types.js";
import type { Side } from "../entities/types/players.types.js";
import { domainErrorHandler } from "./errors/domainErrorHandler.js";
import { initializers } from "./initializers.js";


type BoardSquares = FixedLengthArray<FixedLengthArray<{ side: Side, piece: PieceKind } | undefined, 9>, 9>;

type Status = {
  gameEndStatus: Game["status"]["gameEndStatus"],
  remainingSeconds: Timer["remainingSeconds"],
  history: {
    board: BoardSquares
    hands: GameState["hands"]["pieceRecord"]
  }[],
  currentSide: Side
}

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


  public get status(): Status {
    return domainErrorHandler((): Status => {
      const history = this._game.status.history;

      return {
        gameEndStatus: this._game.status.gameEndStatus,
        remainingSeconds: this._timer.remainingSeconds,
        history: history.map(gameState => {
          return {
            board: gameState.board.squares.map(row =>
              row.map(square => square ? { side: square.side, piece: square.kind } : undefined)
            ) as BoardSquares,
            hands: gameState.hands.pieceRecord
          }
        }),
        currentSide: this._game.status.history.at(-1)!.currentSide
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
