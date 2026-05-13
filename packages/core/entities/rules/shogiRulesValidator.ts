import { violateDoublePawn } from "./rules/violateDoublePawn.js";


export const ShogiRulesValidator = {
  // 移動後のシミュレーションを持つルール
  assertIllegalMove: {
    drop: {
      violateDoublePawn
    }
  }
}
