import { describe, expect, it } from "vitest";
import { ShogiPlayer } from "../ShogiPlayer";

describe("ShogiPlayer.test.ts", () => {
  describe("正常にinitできる", () => {
    it("init.hirate()", () => {
      const result = ShogiPlayer.init.hirate();

      expect(result).toEqual(
        expect.objectContaining({
          success: true
        })
      )
    });
  });
})
