import { logger } from "@packages/tools";
import { serverMessageSchema } from "@packages/ws-messages";
import { SocketStatusCtx } from "../contexts/socketStatus";


export const onMessageEvent = (
  data: unknown,
  setLastMessage: SocketStatusCtx["setLastMessage"]
) => {
  const parsed = serverMessageSchema.safeParse(data);

  if (!parsed.success) {
    logger.fatal("Invalid server message.");
    return;
  }

  const message = parsed.data;
  setLastMessage(message);

  // メッセージに応じた処理を行う
}
