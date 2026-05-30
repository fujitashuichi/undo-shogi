import { describe, it } from "vitest";
import { ShogiPlayer } from "../ShogiPlayer";

describe("正常にinitできる", () => {
  it("init.hirate()", () => {
    const result = ShogiPlayer.init.hirate();

    console.log(result);
  });
});
