import { describe, expect, it } from "vitest";
import { Board } from "../../Board/Board.js";
import { hirateSquares } from "../../Board/hirateSquares.js";
import { searchKingPosition } from "../searchKing.js";
describe("searchKingPosition", () => {
    const board = new Board(hirateSquares);
    it("先手玉の位置を返す", () => {
        expect(searchKingPosition(board, "Sente")).toEqual({ x: 4, y: 8 });
    });
    it("後手玉の位置を返す", () => {
        expect(searchKingPosition(board, "Gote")).toEqual({ x: 4, y: 0 });
    });
});
//# sourceMappingURL=searchKing.test.js.map