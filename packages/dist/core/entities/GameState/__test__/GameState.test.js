import { describe, expect, it } from "vitest";
import { GameState } from "../GameState.js";
import { Board } from "../../Board/Board.js";
import { hirateSquares } from "../../Board/hirateSquares.js";
import { emptyHands } from "../../Hand/__mock__/emptyHands.js";
import { fullHands } from "../../Hand/__mock__/fullHands.js";
import { PieceError } from "../../../errors/piece.error.js";
import { MovementError } from "../../../errors/movement.errors.js";
import { boardDebugger } from "../../Board/__debug__/Board.debug.js";
import { checkedSquares } from "../validators/__mock__/checkedSquare.js";
describe("GameState", () => {
    it("駒を動かした際に手番が移る", () => {
        const board = new Board(hirateSquares);
        const gameState = new GameState(board, emptyHands);
        const nextState = gameState.movePiece({ x: 2, y: 6 }, { x: 2, y: 5 }, false);
        expect(nextState.currentSide).toBe("Gote");
        const nextNextState = nextState.movePiece({ x: 6, y: 2 }, { x: 6, y: 3 }, false);
        expect(nextNextState.currentSide).toBe("Sente");
    });
    it("持ち駒を打った際に手番が移る", () => {
        const board = new Board(hirateSquares);
        const gameState = new GameState(board, fullHands);
        const nextState = gameState.dropPiece({ x: 3, y: 5 }, "Gold");
        expect(nextState.currentSide).toBe("Gote");
        const nextNextState = nextState.dropPiece({ x: 5, y: 3 }, "Gold");
        expect(nextNextState.currentSide).toBe("Sente");
    });
    describe("ゲーム進行が正常に行える", () => {
        it("相掛かりの例", () => {
            const gameState = new GameState(new Board(hirateSquares), emptyHands);
            const nextState = gameState
                .movePiece({ x: 7, y: 6 }, { x: 7, y: 5 }, false) // 先手: 2六歩
                .movePiece({ x: 1, y: 2 }, { x: 1, y: 3 }, false) // 後手: 8四歩
                .movePiece({ x: 7, y: 5 }, { x: 7, y: 4 }, false) // 先手: 2五歩
                .movePiece({ x: 1, y: 3 }, { x: 1, y: 4 }, false) // 後手: 8五歩
                .movePiece({ x: 2, y: 6 }, { x: 2, y: 5 }, false) // 先手: 7六歩
                .movePiece({ x: 6, y: 2 }, { x: 6, y: 3 }, false) // 後手: 3四歩
                .movePiece({ x: 3, y: 8 }, { x: 2, y: 7 }, false) // 先手: 7八金
                .movePiece({ x: 5, y: 0 }, { x: 6, y: 1 }, false) // 後手: 3二金
                .movePiece({ x: 7, y: 4 }, { x: 7, y: 3 }, false) // 先手: 2四歩
                .movePiece({ x: 7, y: 2 }, { x: 7, y: 3 }, false) // 後手: 同歩
                .movePiece({ x: 7, y: 7 }, { x: 7, y: 3 }, false) // 先手: 同飛車
                .movePiece({ x: 1, y: 4 }, { x: 1, y: 5 }, false) // 後手: 8六歩
                .movePiece({ x: 1, y: 6 }, { x: 1, y: 5 }, false) // 先手: 同歩
                .movePiece({ x: 1, y: 1 }, { x: 1, y: 5 }, false) // 後手: 同飛車
                .movePiece({ x: 7, y: 3 }, { x: 7, y: 5 }, false); // 先手: 2六飛車（相掛かり）
            expect(nextState.hands.pieceRecord.Sente).toEqual(expect.objectContaining({
                Pawn: 2
            }));
            expect(nextState.hands.pieceRecord.Gote).toEqual(expect.objectContaining({
                Pawn: 2
            }));
        });
    });
    describe("不正な手をエラーにする", () => {
        it("既定のベクトルに従わない駒移動はできない", () => {
            const gameState = new GameState(new Board(hirateSquares), emptyHands);
            expect(() => gameState.movePiece({ x: 7, y: 6 }, { x: 7, y: 1 }, false)).toThrow(PieceError);
        });
        it("成れない位置で成らない", () => {
            const gameState = new GameState(new Board(hirateSquares), emptyHands);
            expect(() => gameState.movePiece({ x: 7, y: 6 }, { x: 7, y: 5 }, true)).toThrow(MovementError);
        });
        it("手番を無視できない", () => {
            const gameState = new GameState(new Board(hirateSquares), emptyHands);
            expect(() => gameState.movePiece({ x: 1, y: 2 }, { x: 1, y: 3 }, false)).toThrow(MovementError);
        });
        it("王手のまま手を指せない", () => {
            const gameState = new GameState(new Board(checkedSquares), fullHands);
            expect(() => gameState.movePiece({ x: 4, y: 8 }, { x: 5, y: 8 }, false)).toThrow(MovementError);
            expect(() => gameState.dropPiece({ x: 4, y: 4 }, "Gold")).toThrow(MovementError);
        });
    });
});
//# sourceMappingURL=GameState.test.js.map