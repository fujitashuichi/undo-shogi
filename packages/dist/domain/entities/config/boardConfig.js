export const boardConfig = {
    boardSize: 9,
    promotionZone: 3
};
if (boardConfig.boardSize < boardConfig.promotionZone) {
    throw new Error("promotionZone は boardSize よりも小さい必要があります。");
}
//# sourceMappingURL=boardConfig.js.map