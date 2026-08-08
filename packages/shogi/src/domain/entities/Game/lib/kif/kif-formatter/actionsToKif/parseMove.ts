import type { Position } from "@/schemas/primitive/algebraic.js";
import type { MoveAction } from "../../types/types.js";
import { codeToKifPieceMap } from "../lib/codeToKifPieceMap.js";
import { convertPosition } from "../lib/convertPosition.js";
import { promotablePieceKindSchema, promotedPieceKindSchema } from "@/schemas/primitive/piece.js";
import type { Side } from "@/schemas/primitive/players.js";
import { isInPromotionZone } from "@/domain/entities/lib/positions/isInArea/isInPromotionZone.js";

export const parseMove = (move: MoveAction, kifLines: string[], step: number, toPosition: Position, toStr: string) => {
  const stepStr = step.toString().padStart(4, " ");

  if (move.type === "drop") {
    const pieceName = codeToKifPieceMap[move.kind] || move.kind;
    kifLines.push(`${stepStr} ${toStr}${pieceName}打`);
  } else {
    const fromPosition = convertPosition.logicToKifPosition({
      x: move.from.x,
      y: move.from.y
    });

    const baseKind = move.kind;
    const isAlreadyPromoted = promotedPieceKindSchema.safeParse(baseKind).success;

    let pieceName = codeToKifPieceMap[baseKind] || baseKind;

    let promoteStr = "";
    const side: Side = step % 2 === 1 ? "Sente" : "Gote";

    if (!isAlreadyPromoted) {
      if (move.promote) {
        promoteStr = "成";
      } else {
        const canPromote =
          promotablePieceKindSchema.safeParse(baseKind).success && (
            isInPromotionZone(side, fromPosition) ||
            isInPromotionZone(side, toPosition)
          );

        if (canPromote) {
          promoteStr = "不成";
        }
      }
    }

    kifLines.push(`${stepStr} ${toStr}${pieceName}${promoteStr}(${fromPosition.x}${fromPosition.y})`);
  }
}
