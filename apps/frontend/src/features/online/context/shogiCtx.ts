import { ShogiSessionCtx, useShogiSession } from "./session/contexts/sessionCtx";
import { SessionErrorCtx, useSessionError } from "./session/contexts/ErrorCtx";
import { SocketStatusCtx, useSocketStatus } from "./ws/contexts/socketStatus";
import { ShogiStatusCtx, useShogiStatus } from "./gameStatus/contexts/StatusCtx";
import { ShogiErrorCtx, useShogiError } from "./gameStatus/contexts/ErrorCtx";

export type ShogiCtx = {
  socketStatusCtx: SocketStatusCtx,

  shogiStatusCtx: ShogiStatusCtx
  shogiErrorCtx: ShogiErrorCtx,

  sessionCtx: ShogiSessionCtx,
  sessionErrorCtx: SessionErrorCtx
}

export const useShogi = (): ShogiCtx => {
  return {
    socketStatusCtx: useSocketStatus(),

    shogiStatusCtx: useShogiStatus(),
    shogiErrorCtx: useShogiError(),

    sessionCtx: useShogiSession(),
    sessionErrorCtx: useSessionError()
  };
}
