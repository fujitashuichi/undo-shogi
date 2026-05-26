export const hashGameStates = (gameStates) => {
    return gameStates.map(state => {
        const squaresJson = JSON.stringify(state.board.squares.map(col => {
            return col.map(square => {
                if (!square)
                    return "";
                return `${square.kind}`;
            });
        }));
        const handsJson = JSON.stringify(state.hands);
        return `squares=${squaresJson}&hands=${handsJson}&currentSide=${state.currentSide}&checked=${state.checked}&checkMated=${state.checkMated}`;
    });
};
//# sourceMappingURL=hashGameStates.js.map