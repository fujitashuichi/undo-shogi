export const executeActions = (actions, initialState) => {
    let currentState = initialState;
    const results = actions.map(action => {
        if (action.type === "move") {
            currentState = currentState.movePiece(action.from, action.to, action.promote);
        }
        else {
            currentState = currentState.dropPiece(action.to, action.kind);
        }
        return currentState;
    });
    return [initialState, ...results];
};
//# sourceMappingURL=executeActions.js.map