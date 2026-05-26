import { describe, expect, it } from "vitest";
import { kifToActions } from "../kifToActions.js";

describe("kifToObject", () => {
  it("正常に棋譜をパースする", () => {
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

    expect(actions).toEqual(
      expect.arrayContaining([
        { type: "move", from: { x: 2, y: 6 }, to: { x: 2, y: 5 }, kind: "Pawn", promote: false },
        { type: "move", kind: "Pawn", from: { x: 6, y: 2 }, to: { x: 6, y: 3 }, promote: false },
        { type: "move", kind: "Bishop", from: { x: 1, y: 7 }, to: { x: 7, y: 1 }, promote: true },
        expect.objectContaining({ type: "move", kind: "Gold" }),
        expect.objectContaining({ type: "drop", kind: "Bishop" }),
        expect.objectContaining({ type: "move", kind: "King" }),
        expect.objectContaining({ type: "move", kind: "P_Bishop" })
      ])
    );
  });
});
