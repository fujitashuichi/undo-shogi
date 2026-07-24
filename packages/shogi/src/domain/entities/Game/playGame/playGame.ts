import type { Position } from "@/schemas/primitive/algebraic.js";
import type { Game } from "../Game.js";
import { checkGameEnd } from "../lib/checkGameEnd.js";
import type { NormalPieceKind } from "@/schemas/primitive/piece.js";
import { GameError } from "../../errors/gameError.js";


type PlayGameResult = {
  movePiece(currentPos: Position, nextPos: Position, promote: boolean): Game["status"],
  dropPiece(position: Position, kind: NormalPieceKind): Game["status"],
  undo(): Game["status"]
}


export const playGame = (gameHistory: Game["status"]): PlayGameResult => {
  const history = gameHistory.history;

  if (history.length === 0) {
    throw new GameError("ZERO_LENGTH_HISTORY");
  }


  const movePiece = (currentPos: Position, nextPos: Position, promote: boolean): Game["status"] => {
    const gameState = history.at(-1)!;
    const newState = gameState.movePiece(currentPos, nextPos, promote);

    const statesHistory = [...history, newState];

    return {
      gameEndStatus: checkGameEnd(statesHistory),
      history: statesHistory
    }
  }

  const dropPiece = (position: Position, kind: NormalPieceKind): Game["status"] => {
    const gameState = history.at(-1)!;
    const newState = gameState.dropPiece(position, kind);

    const statesHistory = [...history, newState];

    return {
      gameEndStatus: checkGameEnd(statesHistory),
      history: statesHistory
    }
  }

  const undo = (): Game["status"] => {
    if (history.length <= 1) {
      throw new GameError("INVALID_UNDO");
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
