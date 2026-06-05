import { describe, it } from "vitest";
import { hirateSquares } from "../../../../entities/Board/squares/hirateSquares";
import { tenOchiSquares } from "../../../../entities/Board/squares/tenOchiSquares";
import { kakuOchiSquares } from "../../../../entities/Board/squares/kakuOchiSquares";
import { vitest_checkSquares } from "../../../../../tools/vitest/checkSquares";
import { createInitialStateByKif } from "../kif/createInitialStateByKif";



describe("createInitialStateByKif", () => {
  describe("平手のKIFを正常に読み取る", () => {
    it("手合割未指定は平手になる", () => {
      const initialState = createInitialStateByKif(`
        # ---- ぴよ将棋w 棋譜ファイル ----
        棋戦：ぴよ将棋w R対象
        開始日時：2026/06/04 12:08:07
        終了日時：2026/06/04 12:08:41
        先手：プレイヤー
        後手：Lv18 ピヨ行(R1040)
        手数----指手---------消費時間--
          1 ７六歩(77)   ( 0:01/00:00:01)
          2 ３四歩(33)   ( 0:01/00:00:01)
          3 ２六歩(27)   ( 0:01/00:00:02)
          4 中断         ( 0:00/00:00:05)
        まで3手で中断
      `);

      vitest_checkSquares.sameSquares(
        initialState.board.squares,
        hirateSquares
      );
    });

    it("「手合割：平手」は平手になる", () => {
      const initialState = createInitialStateByKif(`
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

      vitest_checkSquares.sameSquares(
        initialState.board.squares,
        hirateSquares
      );
    });
  });

  describe("駒落ちのKIFを正常に読み取る: 一部ケース抜粋", () => {
    it("「手合割：十枚落ち」は十枚落ちになる", () => {
      const initialState = createInitialStateByKif(`
        # ---- ぴよ将棋w 棋譜ファイル ----
        棋戦：ぴよ将棋w 十枚落ち
        開始日時：2026/06/04 12:17:25
        終了日時：2026/06/04 12:17:46
        下手：Lv1  ひよこ(R30)
        上手：プレイヤー
        手合割：十枚落ち
        手数----指手---------消費時間--
          1 ４二玉(51)   ( 0:07/00:00:07)
          2 ７六歩(77)   ( 0:01/00:00:01)
          3 ５四歩(53)   ( 0:05/00:00:12)
          4 ６八玉(59)   ( 0:01/00:00:02)
          5 中断         ( 0:00/00:00:01)
        まで4手で中断
      `);

      vitest_checkSquares.sameSquares(
        initialState.board.squares,
        tenOchiSquares
      );
    });

    it("「手合割：角落ち」は角落ちになる", () => {
      const initialState = createInitialStateByKif(`
        # ---- ぴよ将棋w 棋譜ファイル ----
        棋戦：ぴよ将棋w 角落ち
        開始日時：2026/06/04 12:23:37
        終了日時：2026/06/04 12:23:57
        下手：Lv10 ピヨ太(R450)
        上手：プレイヤー
        手合割：角落ち
        手数----指手---------消費時間--
          1 ８四歩(83)   ( 0:08/00:00:08)
          2 ７六歩(77)   ( 0:01/00:00:01)
          3 ８五歩(84)   ( 0:04/00:00:12)
          4 ７七角(88)   ( 0:01/00:00:02)
          5 中断         ( 0:00/00:00:01)
        まで4手で中断
      `);

      vitest_checkSquares.sameSquares(
        initialState.board.squares,
        kakuOchiSquares
      );
    });
  });
});
