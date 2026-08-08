/**
 * KIF文字列を解析し、GameStateが解釈できる着手情報の配列に変換します。
 */

import type { KifPosition, MoveAction } from "../../types/types.js";
import { parseLine } from "./parseLine.js";


export const kifToActions = (kifText: string): MoveAction[] => {
  const lines = kifText.split(/\r?\n/);
  const moves: MoveAction[] = [];

  let lastTo: KifPosition | null = null;

  const moveRegex = /^\s*(\d+)\s+([１２３４５６７８９一二三四五六七八九同][\s　]*[一二三四五六七八九]?)(成銀|成桂|成香|と|[\u4e00-\u9faf]{1,2})([右左直上寄引行入])?(?:\((\d)(\d)\)|打)?/;

  for (const line of lines) {
    if (
      line.includes("投了") ||
      line.includes("千日手") ||
      line.includes("詰み")
    ) {
      break;
    }

    const match = new RegExp(moveRegex).exec(line);
    if (!match) continue;

    parseLine(match, line, lastTo, moves);
  }

  return moves;
};
