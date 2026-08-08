/**
 * GameStateに流し込んだ着手オブジェクトの配列から、KIF形式の棋譜テキストを出力します。
 * 移動前の駒種が必要なため、シミュレーション時の情報を一部付与して渡す構造を想定しています。
 */


import type { KifPosition, MoveAction } from "../../types/types.js";
import { convertPosition } from "../lib/convertPosition.js";
import { parseMove } from "./parseMove.js";


const numToKanjiX = ["", "１", "２", "３", "４", "５", "６", "７", "８", "９"];
const numToKanjiY = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];


export const actionsToKif = (moves: MoveAction[]): string => {
  let kifLines: string[] = ["手数----指手"];
  let lastTo: KifPosition | null = null;

  moves.forEach((move, i) => {
    const step = i + 1;

    const toPosition = convertPosition.logicToKifPosition({
      x: move.to.x,
      y: move.to.y
    });

    let toStr = "";
    if (lastTo?.x === toPosition.x && lastTo.y === toPosition.y) {
      toStr = "同　";
    } else {
      toStr = `${numToKanjiX[toPosition.x]}${numToKanjiY[toPosition.y]}`;
    }
    lastTo = toPosition;

    parseMove(move, kifLines, step, toPosition, toStr);
  });

  return kifLines.join("\n");
};
