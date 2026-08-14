import { ShogiCtx } from "@/features/online/context/shogiCtx";
import { ServerSessionMessage } from "@packages/ws-messages";

export const sessionLogic = (
  message: ServerSessionMessage,
  shogiCtx: ShogiCtx
) => {
  const { sessionCtx, sessionErrorCtx } = shogiCtx;
  const { setStatus, setSession } = sessionCtx;
  const { setErrorName } = sessionErrorCtx;

  if (!message.success) {
    setErrorName(message.errorName);
    return;
  }

  setStatus("matched");
  setSession(message.body);
}
