/**
 * GameStateに流し込んだ着手オブジェクトの配列から、KIF形式の棋譜テキストを出力します。
 * 移動前の駒種が必要なため、シミュレーション時の情報を一部付与して渡す構造を想定しています。
 */

import { isInPromotionZone } from "../../core/entities/lib/positions/isInArea/isInPromotionZone.js";
import { PromotablePieceKindSchema, PromotedPieceKindSchema, type Side } from "../../core/entities/types/piece.types.js";
import { codeToKifPieceMap } from "./lib/codeToKifPieceMap.js";
import { convertPosition } from "./lib/convertPosition.js";
import type { KifPosition, MoveAction } from "./types.js";


const numToKanjiX = ["", "１", "２", "３", "４", "５", "６", "７", "８", "９"];
const numToKanjiY = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

export const actionsToKif = (moves: MoveAction[]): string => {
  let kifLines: string[] = ["手数----指手"];
  let lastTo: KifPosition | null = null;

  moves.forEach((move, i) => {
    const step = i + 1;
    const pad = step.toString().padStart(4, " ");

    const toPosition = convertPosition.logicToKifPosition({
      x: move.to.x,
      y: move.to.y
    });

    let toStr = "";
    if (lastTo && lastTo.x === toPosition.x && lastTo.y === toPosition.y) {
      toStr = "同　";
    } else {
      toStr = `${numToKanjiX[toPosition.x]}${numToKanjiY[toPosition.y]}`;
    }
    lastTo = toPosition;

    if (move.type === "drop") {
      const pieceName = codeToKifPieceMap[move.kind] || move.kind;
      kifLines.push(`${pad} ${toStr}${pieceName}打`);
    } else {
      const fromPosition = convertPosition.logicToKifPosition({
        x: move.from.x,
        y: move.from.y
      });

      const baseKind = move.kind;
      const isAlreadyPromoted = PromotedPieceKindSchema.safeParse(baseKind).success;

      let pieceName = codeToKifPieceMap[baseKind] || baseKind;

      let promoteStr = "";
      const side: Side = step % 2 === 1 ? "Sente" : "Gote";

      if (!isAlreadyPromoted) {
        if (move.promote) {
          promoteStr = "成";
        } else {
          const canPromote =
            PromotablePieceKindSchema.safeParse(baseKind).success && (
              isInPromotionZone(side, fromPosition) ||
              isInPromotionZone(side, toPosition)
            );

          if (canPromote) {
            promoteStr = "不成";
          }
        }
      }

      kifLines.push(`${pad} ${toStr}${pieceName}${promoteStr}(${fromPosition.x}${fromPosition.y})`);
    }
  });

  return kifLines.join("\n");
};
