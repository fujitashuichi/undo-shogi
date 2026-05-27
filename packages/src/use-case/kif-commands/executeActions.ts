import type { GameState } from "../../core/entities/GameState/GameState.js";
import type { MoveAction } from "../../interface/kif-formatter/types.js";

export const executeActions = (actions: MoveAction[], initialState: GameState): GameState[] => {
  let currentState: GameState = initialState;

  const results = actions.map(action => {
    if (action.type === "move") {
      currentState = currentState.movePiece(action.from, action.to, action.promote);
    } else {
      currentState = currentState.dropPiece(action.to, action.kind);
    }

    return currentState;
  });

  return [initialState, ...results];
}
