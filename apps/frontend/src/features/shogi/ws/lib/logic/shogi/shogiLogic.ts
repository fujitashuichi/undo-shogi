import { ShogiCtx } from "@/features/shogi/Contexts/shogiCtx";
import { ServerShogiMessage } from "@packages/ws-messages";

export const shogiLogic = (
  message: ServerShogiMessage,
  shogiCtx: ShogiCtx
) => {
  const { shogiErrorCtx, shogiStateCtx } = shogiCtx;
  const { setErrorName } = shogiErrorCtx;
  const { setStatus, setCurrentBoard, setCurrentTime } = shogiStateCtx;

  if (!message.success) {
    setErrorName(message.errorName);
    return;
  }

  setStatus(message.body.status);
  setCurrentBoard(message.body.status.history.at(-1) ?? null);
  setCurrentTime(message.body.status.remainingSeconds);
}
