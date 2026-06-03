import { describe, expect, it } from "vitest";
import { ShogiPlayer } from "../ShogiPlayer";
import { handicapSchema } from "../../../entities/handicap.types";

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

    it("init[handicap]()", () => {
      handicapSchema.options.forEach(handicap => {
        const result = ShogiPlayer.init[handicap]();

        expect(result).toEqual(
          expect.objectContaining({
            success: true
          })
        );
      })
    });
  });
})
