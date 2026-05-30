import type { GameState } from "../../entities/GameState/GameState.js";
import { hashGameStates } from "../../service/kif-commands/hashGameStates.js";
import { checkRepetition } from "../../service/kif-commands/validators/checkRepetition.js";


export type GameEndStatus =
  | {
    ended: false
  }
  | {
    ended: true,
    winner: "Sente" | "Gote" | "Draw"
  }


export const checkGameEnd = (gameStates: GameState[]): GameEndStatus => {
  if (gameStates.length === 0) {
    return {
      ended: false
    }
  };

  const checkMated = gameStates.at(-1)!.checkMated;

  if (checkMated) {
    return {
      ended: true,
      winner: checkMated === "Sente" ? "Gote" : "Sente"
    }
  }


  const actionsHash = hashGameStates(gameStates);
  const result = checkRepetition(actionsHash);


  if (result.isRepetition) {
    switch (result.type) {
      case "SENTE_LOSE":
        return {
          ended: true,
          winner: "Gote"
        }

      case "GOTE_LOSE":
        return {
          ended: true,
          winner: "Sente"
        }

      case "DRAW":
        return {
          ended: true,
          winner: "Draw"
        }
    }
  }

  return {
    ended: false
  }
}
