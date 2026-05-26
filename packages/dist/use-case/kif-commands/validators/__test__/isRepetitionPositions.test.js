import { describe, expect, it } from "vitest";
import { isRepetitionPositions } from "../isRepetitionPositions.js";
import { hashGameStates } from "../../hashGameStates.js";
import { kifToActions } from "../../../kif-formatter/kifToActions.js";
import { executeActions } from "../../executeActions.js";
import { initialGameState_Hirate } from "../../../../core/entities/GameState/initialGameState_Hirate.js";
describe("isRepetitionPositions", () => {
    it("同一局面が4回出たときに正しく判定する", () => {
        const repetitionKif = `
      手数----指手---------消費時間--
      # 初期局面
      1 ５八玉(59)     ( 0:00/00:00:00)
      2 ５二玉(51)     ( 0:00/00:00:00)
      3 ５九玉(58)     ( 0:00/00:00:00)
      4 ５一玉(52)     ( 0:00/00:00:00)
      # 初期局面
      5 ５八玉(59)     ( 0:00/00:00:00)
      6 ５二玉(51)     ( 0:00/00:00:00)
      7 ５九玉(58)     ( 0:00/00:00:00)
      8 ５一玉(52)     ( 0:00/00:00:00)
      # 初期局面
      9 ５八玉(59)     ( 0:00/00:00:00)
      10 ５二玉(51)     ( 0:00/00:00:00)
      11 ５九玉(58)     ( 0:00/00:00:00)
      12 ５一玉(52)     ( 0:00/00:00:00)
      # 初期局面
    `;
        const actionsHash = hashGameStates(executeActions(kifToActions(repetitionKif), initialGameState_Hirate));
        expect(isRepetitionPositions(actionsHash)).toBe(true);
    });
});
//# sourceMappingURL=isRepetitionPositions.test.js.map