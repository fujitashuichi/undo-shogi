const mapPromotedToNormal = {
    P_Silver: "Silver", P_Knight: "Knight", P_Lance: "Lance",
    P_Bishop: "Bishop", P_Rook: "Rook",
    P_Pawn: "Pawn"
};
export const promotedKindToNormal = (kind) => {
    return mapPromotedToNormal[kind];
};
//# sourceMappingURL=promotedToNormal.js.map