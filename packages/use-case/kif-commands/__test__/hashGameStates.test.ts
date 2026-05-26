import { describe, it } from "vitest";
import { hashGameStates } from "../hashGameStates.js";
import { executeActions } from "../executeActions.js";
import { kifToActions } from "../../kif-formatter/kifToActions.js";
import { initialGameState_Hirate } from "../../../core/entities/GameState/initialGameState_Hirate.js";
import { vitest_checkArray } from "../../../tools/vitest/checkArray.js";

describe("hashGameStates", () => {
  it("同じ盤面は同じハッシュになる", () => {
    const actions = kifToActions(`
      手数----指手---------消費時間--
        1 ７六歩(77)     ( 0:00/00:00:00)
        2 ３四歩(33)     ( 0:00/00:00:00)
        3 ２二角成(88)   ( 0:00/00:00:00)
        4 ５二金左(41)   ( 0:00/00:00:00)
        5 ４二角打       ( 0:00/00:00:00)
        6 ４一玉(51)     ( 0:00/00:00:00)
        7 ３一馬(22)     ( 0:00/00:00:00)
        8 詰み
    `);

    const hashed_1 = hashGameStates(
      executeActions(actions, initialGameState_Hirate)
    );

    const hashed_2 = hashGameStates(
      executeActions(actions, initialGameState_Hirate)
    )

    vitest_checkArray.sameArray(
      hashed_1,
      hashed_2
    )
  });
});
