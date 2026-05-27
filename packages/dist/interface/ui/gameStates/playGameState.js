import { convertToDomainError } from "../../errors/domain.error.js";
export const playGameState = {
    move: (gameState, currentPos, nextPos, promote) => {
        try {
            const nextState = gameState.movePiece(currentPos, nextPos, promote);
            return {
                success: true,
                nextState
            };
        }
        catch (err) {
            return {
                success: false,
                error: convertToDomainError(err)
            };
        }
    },
    drop: (gameState, position, kind) => {
        try {
            const nextState = gameState.dropPiece(position, kind);
            return {
                success: true,
                nextState
            };
        }
        catch (err) {
            return {
                success: false,
                error: convertToDomainError(err)
            };
        }
    }
};
//# sourceMappingURL=playGameState.js.map