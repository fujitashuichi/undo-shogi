import type { Position } from "@/schemas/primitive/algebraic.js";
import type { KifPosition, MoveAction } from "../../types/types.js";
import { kifPieceMap } from "../lib/kifPieceMap.js";
import { normalPieceKindSchema } from "@/schemas/primitive/piece.js";
import { KifError } from "@/domain/entities/errors/kifError.js";
import { convertPosition } from "../lib/convertPosition.js";
import { stringToNum } from "../lib/stringToNum.js";

const parseMove = (
  method: "drop" | "move",
  pieceStr: string,
  fromXStr: string | undefined, fromYStr: string | undefined,
  to: Position,
  moves: MoveAction[]
) => {
  if (method === "drop") {
    const piece = pieceStr.split(/打/)[0]!;
    const kind = kifPieceMap[piece];

    const parsed = normalPieceKindSchema.safeParse(kind);
    if (!parsed.success) throw new KifError("UNSUPPORTED_KIF");

    moves.push({ type: "drop", to, kind: parsed.data });
  } else {
    const piece = pieceStr
      .replace(/成$/, "")
      .split(/[右左直上寄引行入]|不成/)[0]!;
    const kind = kifPieceMap[piece];

    if (!fromXStr || !fromYStr || !kind) throw new KifError("UNSUPPORTED_KIF");

    const kifFromX = Number.parseInt(fromXStr, 10);
    const kifFromY = Number.parseInt(fromYStr, 10);
    const from: Position = convertPosition.kifToLogicPosition({ x: kifFromX, y: kifFromY });

    const promote = pieceStr.includes("成");

    moves.push({ type: "move", from, to, kind, promote });
  }
}


export const parseLine = (
  match: RegExpExecArray, line: string,
  lastTo: KifPosition | null, moves: MoveAction[]
) => {
  const [_, _indexStr, toStr, pieceStr, _modifierStr, fromXStr, fromYStr] = match;

  if (!toStr || !pieceStr) throw new KifError("UNSUPPORTED_KIF");

  let kifToX: KifPosition["x"] = 0;
  let kifToY: KifPosition["y"] = 0;

  if (toStr.startsWith("同")) {
    if (!lastTo) throw new KifError("UNSUPPORTED_KIF");

    kifToX = lastTo.x;
    kifToY = lastTo.y;
  } else {
    kifToX = stringToNum[toStr[0]!] ?? 0;
    kifToY = stringToNum[toStr[1]!] ?? 0;

    if (kifToX === 0 || kifToY === 0) throw new KifError("UNSUPPORTED_KIF");
  }

  lastTo = { x: kifToX, y: kifToY };

  const to: Position = convertPosition.kifToLogicPosition(lastTo);

  const isDrop = line.includes("打") || (!fromXStr && !fromYStr && !toStr.startsWith("同"));

  parseMove(isDrop ? "drop" : "move", pieceStr, fromXStr, fromYStr, to, moves);
}
