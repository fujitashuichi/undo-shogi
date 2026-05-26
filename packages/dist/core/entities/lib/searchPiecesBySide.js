export const searchPiecesBySide = {
    returnInstances: (board, side) => {
        let pieces = [];
        board.squares.forEach(row => {
            row.forEach(square => {
                if (square && square.side === side) {
                    pieces.push(square);
                }
            });
        });
        return pieces;
    },
    returnPositions: (board, side) => {
        let positions = [];
        board.squares.forEach((row, y) => {
            row.forEach((square, x) => {
                if (square && square.side === side) {
                    positions.push({ x, y });
                }
            });
        });
        return positions;
    }
};
//# sourceMappingURL=searchPiecesBySide.js.map