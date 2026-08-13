import { logger } from "@packages/tools";
import { ServerMessage } from "@packages/ws-messages";
import { ShogiCtx } from "../context/shogiCtx";
import { systemLogic } from "./logic/system/systemLogic";
import { sessionLogic } from "./logic/session/sessionLogic";
import { shogiLogic } from "./logic/shogi/shogiLogic";

export const messageRouter = (
  message: ServerMessage,
  shogiCtx: ShogiCtx
) => {
  switch (message.type) {
    case "system":
      systemLogic(message, shogiCtx);
      break;

    case "session":
      sessionLogic(message, shogiCtx);
      break;

    case "shogi":
      shogiLogic(message, shogiCtx);
      break;


    default:
      logger.fatal("Invalid data.");
  }
}
