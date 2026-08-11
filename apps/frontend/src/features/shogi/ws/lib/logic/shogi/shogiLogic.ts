import { ShogiCtx } from "@/features/shogi/Contexts/shogiCtx";
import { ServerShogiMessage } from "@packages/ws-messages";

export const shogiLogic = (
  message: ServerShogiMessage,
  shogiCtx: ShogiCtx
) => {
  if (!message.success) {

  }
}
