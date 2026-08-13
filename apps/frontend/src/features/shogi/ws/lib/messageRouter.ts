import { logger } from "@packages/tools";
import { ServerMessage } from "@packages/ws-messages";
import { sessionLogic } from "./logic/session/sessionLogic";
import { systemLogic } from "./logic/system/systemLogic";
import { shogiLogic } from "./logic/shogi/shogiLogic";
import { ShogiCtx } from "../../contexts/shogiCtx";

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
