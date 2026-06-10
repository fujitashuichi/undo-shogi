import { describe, it } from "vitest";
import { useShogiController } from "../useShogiController";
import { renderHook } from "@testing-library/react";
import { playShogi } from "../playShogi";


describe("playShogi", () => {
  const { result } =  renderHook(() => useShogiController());

  const { id, controller } = result.current.createNewController("hirate", {
    remainingSeconds: {
      Sente: 10 * 60,
      Gote:  10 * 60
    }
  });

  it("一局を通した検証", () => {
    playShogi(controller).startMatch();

    // ここに一局の動作を記述し、expectアサーションを行う

    playShogi(controller).stopMatch();
    result.current.removeController(id);
  });
});
