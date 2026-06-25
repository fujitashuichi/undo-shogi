import type { Board } from "../../../Board/Board.js";
import { positionsUnderAttack } from "../../../lib/positions/positionsUnderAttack/positionsUnderAttack.js";
import { searchKingPosition } from "../../../lib/searchKing.js";
import type { Side } from "../../../types/players.types.js";

export const isChecked = (board: Board, side: Side): boolean => {
  const kingPos = searchKingPosition(board, side);
  if (!kingPos) return false;

  const underAttack = positionsUnderAttack.all(board, side === "Sente" ? "Gote" : "Sente");
  return underAttack.some(pos => pos.x === kingPos.x && pos.y === kingPos.y);
}
