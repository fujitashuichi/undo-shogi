import { describe, expect, it } from "vitest";
import { ShogiPlayer } from "../Game";
import { handicapSchema } from "../../types/handicap.types";


describe("ShogiPlayer.test.ts", () => {
  describe("正常にinitできる", () => {
    // initした内容の整合性は、なるべく下位レイヤーのテストで保証する

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

    it("init.byKif()", () => {
      const result = ShogiPlayer.init.byKif(`
        # ---- ぴよ将棋w 棋譜ファイル ----
        棋戦：ぴよ将棋w R対象
        開始日時：2026/06/04 12:08:07
        終了日時：2026/06/04 12:08:41
        先手：プレイヤー
        後手：Lv18 ピヨ行(R1040)
        手合割：平手
        手数----指手---------消費時間--
          1 ７六歩(77)   ( 0:01/00:00:01)
          2 ３四歩(33)   ( 0:01/00:00:01)
          3 ２六歩(27)   ( 0:01/00:00:02)
          4 中断         ( 0:00/00:00:05)
        まで3手で中断
      `);

      expect(result).toEqual(
        expect.objectContaining({
          success: true
        })
      )
    });
  });
})
