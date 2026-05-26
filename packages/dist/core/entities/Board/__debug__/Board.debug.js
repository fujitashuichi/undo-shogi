export const boardDebugger = {
    debugRenderKanji: (board) => {
        const kindToKanji = {
            Pawn: "歩", P_Pawn: "と",
            Lance: "香", P_Lance: "杏",
            Knight: "桂", P_Knight: "圭",
            Silver: "銀", P_Silver: "全",
            Gold: "金",
            Bishop: "角", P_Bishop: "馬",
            Rook: "飛", P_Rook: "龍",
            King: "玉"
        };
        const graph = board.squares
            .map((row) => row
            .map((piece) => {
            if (!piece)
                return "  ・  ";
            const side = piece.side === "Sente" ? "▲" : "△";
            const kanji = kindToKanji[piece.kind] || "？";
            return ` ${side}${kanji}  `;
        })
            .join(""))
            .join("\n\n");
        return `\n ☆ 盤面図 \n${graph}\n`;
    },
    debugRender: (board) => {
        const graph = board.squares
            .map((row) => row
            .map((piece) => {
            if (!piece)
                return " ・ ";
            const side = piece.side === "Sente" ? "▲" : "△";
            if (piece.isPromoted) {
                return ` ${side}${piece.kind.slice(0, 1)} `;
            }
            return ` ${side}${piece.kind.slice(0, 1).toLowerCase()} `;
        })
            .join(""))
            .join("\n");
        return `※成り駒は大文字で表記します\n\n${graph}\n`;
    }
};
//# sourceMappingURL=Board.debug.js.map