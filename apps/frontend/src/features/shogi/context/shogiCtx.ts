import { ShogiSessionCtx, useShogiSession } from "./session/contexts/sessionCtx";
import { SessionErrorCtx, useSessionError } from "./session/contexts/sessionErrorCtx";
import { ShogiErrorCtx, useShogiError } from "./shogiStatus/contexts/ErrorCtx";
import { ShogiStatusCtx, useShogiStatus } from "./shogiStatus/contexts/StatusCtx";
import { SocketStatusCtx, useSocketStatus } from "./ws/contexts/socketStatus";

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
