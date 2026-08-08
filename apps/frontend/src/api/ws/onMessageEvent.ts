import { logger } from "@packages/tools";
import { serverMessageSchema } from "@packages/ws-messages";


export const onMessageEvent = (data: unknown) => {
  const parsed = serverMessageSchema.safeParse(data);

  if (!parsed.success) {
    logger.fatal("Invalid server message.");
    return;
  }


  // メッセージに応じた処理を行う
}
