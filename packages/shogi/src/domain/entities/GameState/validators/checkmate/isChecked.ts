import type { Board } from "@/domain/entities/Board/Board.js";
import { positionsUnderAttack } from "@/domain/entities/lib/positions/positionsUnderAttack/positionsUnderAttack.js";
import { searchKingPosition } from "@/domain/entities/lib/searchKing.js";
import type { Side } from "@/schemas/primitive/players.js";

export const isChecked = (board: Board, side: Side): boolean => {
  const kingPos = searchKingPosition(board, side);
  if (!kingPos) return false;

  const underAttack = positionsUnderAttack.all(board, side === "Sente" ? "Gote" : "Sente");
  return underAttack.some(pos => pos.x === kingPos.x && pos.y === kingPos.y);
}
