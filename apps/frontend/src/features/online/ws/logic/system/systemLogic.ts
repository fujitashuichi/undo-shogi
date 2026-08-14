import { ShogiCtx } from "@/features/online/context/shogiCtx";
import { ServerSystemMessage } from "@packages/ws-messages";

export const systemLogic = (
  message: ServerSystemMessage,
  shogiCtx: ShogiCtx
) => {
  const { systemErrorCtx } = shogiCtx;
  const { setErrorName } = systemErrorCtx;

  setErrorName(message.errorName);
}
