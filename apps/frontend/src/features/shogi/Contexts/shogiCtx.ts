import { SocketStatusCtx, useSocketStatus } from "../ws/contexts/socketStatus";
import { ShogiErrorCtx, useShogiError } from "../errors/contexts/shogiError";
import { ShogiSessionCtx, useShogiSession } from "../session/contexts/shogiSessionCtx";
import { ShogiStateCtx, useShogiState } from "../shogiState/contexts/shogiStateCtx";

export type ShogiCtx = {
  socketStatusCtx: SocketStatusCtx,
  shogiErrorCtx: ShogiErrorCtx,
  shogiSessionCtx: ShogiSessionCtx,
  shogiStateCtx: ShogiStateCtx
}

export const useShogi = (): ShogiCtx => {
  return {
    socketStatusCtx: useSocketStatus(),
    shogiErrorCtx: useShogiError(),
    shogiSessionCtx: useShogiSession(),
    shogiStateCtx: useShogiState()
  };
}
