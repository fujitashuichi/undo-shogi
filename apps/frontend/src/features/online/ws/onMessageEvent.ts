import { logger } from "@packages/tools";
import { serverMessageSchema } from "@packages/ws-messages";
import { messageRouter } from "./messageRouter";
import { ShogiCtx } from "../context/shogiCtx";


export const onMessageEvent = (
  data: unknown,
  shogiCtx: ShogiCtx
) => {
  const parsed = serverMessageSchema.safeParse(data);

  if (!parsed.success) {
    logger.fatal("Invalid server message.");
    return;
  }

  const message = parsed.data;
  messageRouter(message, shogiCtx);
}
