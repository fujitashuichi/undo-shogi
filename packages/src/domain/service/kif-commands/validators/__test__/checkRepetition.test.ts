import { describe, expect, it } from "vitest";
import { checkRepetition } from "../checkRepetition.js";
import { hashGameStates } from "../../hashGameStates.js";
import { executeActions } from "../../executeActions.js";
import { initialGameState_Hirate } from "../../../../core/entities/GameState/initialGameState_Hirate.js";
import { kifToActions } from "../../../kif-formatter/kifToActions.js";

describe("checkRepetition", () => {
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
    `
    const actionsHash = hashGameStates(
      executeActions(
        kifToActions(repetitionKif),
        initialGameState_Hirate
      )
    )

    expect(
      checkRepetition(actionsHash)
    ).toEqual({
      isRepetition: true,
      type: "DRAW"
    });
  });

  it("連続王手の千日手を正しく判定する", () => {
    const kif = `
      # ---- ぴよ将棋w 棋譜ファイル ----
      棋戦：ぴよ将棋w
      開始日時：2026/05/24 22:01:12
      終了日時：2026/05/24 22:02:16
      先手：プレイヤー
      後手：プレイヤー
      手合割：平手
      手数----指手---------消費時間--
        1 ７六歩(77)   ( 0:03/00:00:03)
        2 ３四歩(33)   ( 0:02/00:00:02)
        3 ２二角成(88) ( 0:08/00:00:11)
        4 ６二銀(71)   ( 0:02/00:00:04)
        5 ３三馬(22)   ( 0:02/00:00:13)
        6 ５二玉(51)   ( 0:02/00:00:06)
        7 ４三馬(33)   ( 0:01/00:00:14)
        8 ５一玉(52)   ( 0:03/00:00:09)
        9 ３三馬(43)   ( 0:02/00:00:16)
        10 ５二玉(51)   ( 0:01/00:00:10)
        11 ４三馬(33)   ( 0:01/00:00:17)
        12 ５一玉(52)   ( 0:01/00:00:11)
        13 ３三馬(43)   ( 0:01/00:00:18)
        14 ５二玉(51)   ( 0:02/00:00:13)
        15 ４三馬(33)   ( 0:01/00:00:19)
        16 ５一玉(52)   ( 0:02/00:00:15)
        17 ３三馬(43)   ( 0:01/00:00:20)
        18 ５二玉(51)   ( 0:02/00:00:17)
        19 ４三馬(33)   ( 0:00/00:00:15)
      `;

      const actionsHash = hashGameStates(
        executeActions(
          kifToActions(kif),
          initialGameState_Hirate
        )
      );

      expect(
        checkRepetition(actionsHash)
      ).toEqual({
        isRepetition: true,
        type: "SENTE_LOSE"
      });
  })

  it("王手以外の手を挟んだ場合、連続王手の千日手ではない", () => {
    const kif = `
      # ---- ぴよ将棋w 棋譜ファイル ----
      棋戦：ぴよ将棋w
      開始日時：2026/05/24 22:01:12
      終了日時：2026/05/28 12:17:22
      先手：プレイヤー
      後手：プレイヤー
      手合割：平手
      手数----指手---------消費時間--
        1 ７六歩(77)   ( 0:03/00:00:03)
        2 ３四歩(33)   ( 0:02/00:00:02)
        3 ２二角成(88) ( 0:08/00:00:11)
        4 ６二銀(71)   ( 0:02/00:00:04)
        5 ３三馬(22)   ( 0:02/00:00:13)
        6 ５二玉(51)   ( 0:02/00:00:06)
        7 ４三馬(33)   ( 0:01/00:00:14)
        8 ５一玉(52)   ( 0:03/00:00:09)
        9 ３三馬(43)   ( 0:02/00:00:16)
        10 ５二玉(51)   ( 0:01/00:00:10)
        11 ４三馬(33)   ( 0:01/00:00:17)
        12 ５一玉(52)   ( 0:01/00:00:11)
        13 ３三馬(43)   ( 0:01/00:00:18)
        14 ５二玉(51)   ( 0:02/00:00:13)
        15 ４三馬(33)   ( 0:01/00:00:19)
        16 ５一玉(52)   ( 0:02/00:00:15)
        17 ３三馬(43)   ( 0:01/00:00:20)
        18 ５二玉(51)   ( 0:02/00:00:17)
        19 ４四馬(33)   ( 0:04/00:00:24)
        20 ５一玉(52)   ( 0:01/00:00:18)
        21 ５四馬(44)   ( 0:05/00:00:29)
        22 ５二玉(51)   ( 0:01/00:00:19)
        23 ４三馬(54)   ( 0:01/00:00:30)
    `;

      const actionsHash = hashGameStates(
        executeActions(
          kifToActions(kif),
          initialGameState_Hirate
        )
      );

      expect(
        checkRepetition(actionsHash)
      ).toEqual({
        isRepetition: true,
        type: "DRAW"
      });
  })
});
