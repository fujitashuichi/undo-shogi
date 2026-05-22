import { describe, expect, it } from "vitest";
import { objectToKif } from "../objectToKif.js";

describe("objectToKif", () => {
  it("moveオブジェクトを正常に棋譜化する", () => {
    const kif = objectToKif([
      { type: 'move', from: { x: 2, y: 6 }, to: { x: 2, y: 5 }, kind: 'Pawn', promote: false },
      { type: 'move', from: { x: 6, y: 2 }, to: { x: 6, y: 3 }, kind: 'Pawn', promote: false },
      { type: 'move', from: { x: 1, y: 7 }, to: { x: 7, y: 1 }, kind: 'Bishop', promote: false },
      { type: 'move', from: { x: 5, y: 0 }, to: { x: 4, y: 1 }, kind: 'Gold', promote: false },
      { type: 'drop', to: { x: 5, y: 1 }, kind: 'Bishop' },
      { type: 'move', from: { x: 4, y: 0 }, to: { x: 5, y: 0 }, kind: 'King', promote: false },
      { type: 'move', from: { x: 7, y: 1 }, to: { x: 6, y: 0 }, kind: 'P_Bishop', promote: true }
    ]);

    console.log(kif);

    expect(kif).toEqual(
      expect.stringContaining("手数----指手") &&
      expect.stringContaining("1 ７六歩(77)") &&
      expect.stringContaining("2 ３四歩(33)") &&
      expect.stringContaining("3 ２二角成(88)") &&
      expect.stringContaining("4 ５二金(41)") &&
      expect.stringContaining("5 ４二角打") &&
      expect.stringContaining("6 ４一玉(51)") &&
      expect.stringContaining("7 ３一馬(22)")
    )
  });
});
