import { convertToDomainError } from "../errors/domainError.js";
import { PlayError } from "../logic/errors/playError.js";
import { createNewGame } from "./playGame/createNewGame.js";
import { playGame } from "./playGame/playGame.js";
export class ShogiPlayer {
    history;
    constructor(history) {
        this.history = history;
    }
    static init = {
        hirate: () => {
            try {
                return {
                    success: true,
                    nextPlayer: new ShogiPlayer(createNewGame.hirate())
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
    play = {
        movePiece: (currentPos, nextPos, promote) => {
            try {
                if (this.history.gameEndStatus.ended) {
                    throw new PlayError("GAME_ALREADY_ENDED");
                }
                const nextHistory = playGame(this.history).movePiece(currentPos, nextPos, promote);
                return {
                    success: true,
                    nextPlayer: new ShogiPlayer(nextHistory)
                };
            }
            catch (err) {
                return {
                    success: false,
                    error: convertToDomainError(err)
                };
            }
        },
        dropPiece: (position, kind) => {
            try {
                if (this.history.gameEndStatus.ended) {
                    throw new PlayError("GAME_ALREADY_ENDED");
                }
                const nextHistory = playGame(this.history).dropPiece(position, kind);
                return {
                    success: true,
                    nextPlayer: new ShogiPlayer(nextHistory)
                };
            }
            catch (err) {
                return {
                    success: false,
                    error: convertToDomainError(err)
                };
            }
        },
        undo: () => {
            try {
                const nextHistory = playGame(this.history).undo();
                return {
                    success: true,
                    nextPlayer: new ShogiPlayer(nextHistory)
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
}
//# sourceMappingURL=ShogiPlayer.js.map