import { ShogiCtx } from "@/features/shogi/contexts/shogiCtx";
import { ServerShogiMessage } from "@packages/ws-messages";

export const shogiLogic = (
  message: ServerShogiMessage,
  shogiCtx: ShogiCtx
) => {
  const { shogiErrorCtx, shogiStatusCtx } = shogiCtx;
  const { setErrorName } = shogiErrorCtx;
  const { setStatus, setCurrentBoard, setCurrentTime } = shogiStatusCtx;

  if (!message.success) {
    setErrorName(message.errorName);
    return;
  }

  setStatus(message.body.status);
  setCurrentBoard(message.body.status.history.at(-1) ?? null);
  setCurrentTime(message.body.status.remainingSeconds);
}
