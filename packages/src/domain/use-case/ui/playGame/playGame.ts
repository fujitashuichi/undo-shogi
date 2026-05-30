import type { Position } from "../../../entities/types/algebraic.types.js";
import type { NormalPieceKind } from "../../../entities/types/piece.types.js";
import { checkGameEnd } from "../../logic/checkGameEnd.js";
import { PlayError } from "../../logic/errors/playError.js";
import type { GameHistory } from "../../types/gameHistory.types.js";


type PlayGameResult = {
  movePiece(currentPos: Position, nextPos: Position, promote: boolean): GameHistory,
  dropPiece(position: Position, kind: NormalPieceKind): GameHistory,
  undo(): GameHistory
}


export const playGame = (gameHistory: GameHistory): PlayGameResult => {
  const history = gameHistory.history;

  if (history.length === 0) {
    throw new PlayError("ZERO_LENGTH_HISTORY");
  }


  const movePiece = (currentPos: Position, nextPos: Position, promote: boolean): GameHistory => {
    const gameState = history.at(-1)!;
    const newState = gameState.movePiece(currentPos, nextPos, promote);

    const statesHistory = [...history, newState];

    return {
      gameEndStatus: checkGameEnd(statesHistory),
      history: statesHistory
    }
  }

  const dropPiece = (position: Position, kind: NormalPieceKind): GameHistory => {
    const gameState = history.at(-1)!;
    const newState = gameState.dropPiece(position, kind);

    const statesHistory = [...history, newState];

    return {
      gameEndStatus: checkGameEnd(statesHistory),
      history: statesHistory
    }
  }

  const undo = (): GameHistory => {
    if (history.length <= 1) {
      throw new PlayError("INVALID_UNDO");
    }

    const statesHistory = [...history].slice(0, -1);

    return {
      gameEndStatus: checkGameEnd(statesHistory),
      history: statesHistory
    }
  }

  return {
    movePiece,
    dropPiece,
    undo
  }
}
