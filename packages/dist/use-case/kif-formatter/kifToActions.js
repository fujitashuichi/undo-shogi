/**
 * KIF文字列を解析し、GameStateが解釈できる着手情報の配列（JSON）に変換します。
 */
import { NormalPieceKindSchema } from "../../core/entities/types/piece.types.js";
import { KifError } from "./errors/kif.error.js";
import { convertPosition } from "./lib/convertPosition.js";
import { kifPieceMap } from "./lib/kifPieceMap.js";
import { stringToNum } from "./lib/stringToNum.js";
export const kifToActions = (kifText) => {
    const lines = kifText.split(/\r?\n/);
    const moves = [];
    let lastTo = null;
    const moveRegex = /^\s*(\d+)\s+([１２３４５６７８９一二三四五六七八九同][\s　]*[一二三四五六七八九]?)(成銀|成桂|成香|[\u4e00-\u9faf]{1,2})([右左直上寄引行入])?(?:\((\d)(\d)\)|打)?/;
    for (const line of lines) {
        if (line.includes("投了") ||
            line.includes("千日手") ||
            line.includes("詰み")) {
            break;
        }
        const match = line.match(moveRegex);
        if (!match)
            continue;
        const [_, _indexStr, toStr, pieceStr, _modifierStr, fromXStr, fromYStr] = match;
        if (!toStr || !pieceStr)
            throw new KifError("UNSUPPORTED_KIF");
        let kifToX = 0;
        let kifToY = 0;
        if (toStr.startsWith("同")) {
            if (!lastTo)
                throw new KifError("UNSUPPORTED_KIF");
            kifToX = lastTo.x;
            kifToY = lastTo.y;
        }
        else {
            kifToX = stringToNum[toStr[0]] ?? 0;
            kifToY = stringToNum[toStr[1]] ?? 0;
            if (kifToX === 0 || kifToY === 0)
                throw new KifError("UNSUPPORTED_KIF");
        }
        lastTo = { x: kifToX, y: kifToY };
        const to = convertPosition.kifToLogicPosition(lastTo);
        const isDrop = line.includes("打") || (!fromXStr && !fromYStr && !toStr.startsWith("同"));
        if (isDrop) {
            const piece = pieceStr.split(/[打]/)[0];
            const kind = kifPieceMap[piece];
            const parsed = NormalPieceKindSchema.safeParse(kind);
            if (!parsed.success)
                throw new KifError("UNSUPPORTED_KIF");
            moves.push({ type: "drop", to, kind: parsed.data });
        }
        else {
            const piece = pieceStr
                .replace(/成$/, "")
                .split(/[右左直上寄引行入]|不成/)[0];
            const kind = kifPieceMap[piece];
            if (!fromXStr || !fromYStr || !kind)
                throw new KifError("UNSUPPORTED_KIF");
            const kifFromX = parseInt(fromXStr, 10);
            const kifFromY = parseInt(fromYStr, 10);
            const from = convertPosition.kifToLogicPosition({ x: kifFromX, y: kifFromY });
            const promote = pieceStr.includes("成");
            moves.push({ type: "move", from, to, kind, promote });
        }
    }
    return moves;
};
//# sourceMappingURL=kifToActions.js.map