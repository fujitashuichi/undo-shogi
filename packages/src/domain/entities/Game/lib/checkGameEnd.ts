import type { GameState } from "../../GameState/GameState.js";
import type { GameEndStatus } from "../types/gameHistory.types.js";
import { hashGameStates } from "./kif/kif-commands/hashGameStates.js";
import { checkRepetition } from "./kif/kif-commands/validators/checkRepetition.js";


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
