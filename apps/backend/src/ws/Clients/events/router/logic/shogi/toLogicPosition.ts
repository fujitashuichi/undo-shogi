import type { ShogiPosition } from "@packages/ws-messages";

export const toLogicPosition = (shogiPosition: ShogiPosition) => {
  return {
    x: 9 - shogiPosition.file,
    y: shogiPosition.rank - 1
  }
}
