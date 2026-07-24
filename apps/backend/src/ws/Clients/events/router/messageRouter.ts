import type { ClientMessage } from "@packages/ws-messages";
import type { WssRegistry } from "../../../WssRegistry/WssRegistry";
import type { Client } from "../../Client";
import { sessionRouter } from "./sessionRouter";
import { shogiLogic } from "./shogiLogic";

export const messageRouter = (
  message: ClientMessage,
  client: Client,
  wssRegistry: WssRegistry
) => {
  switch (message.type) {
    case "session":
      sessionRouter(client, wssRegistry, message);
      break;

    case "shogi":
      shogiLogic(client, wssRegistry, message);
      break;

    default:
      client.send({
        type: "none",
        success: false,
        errorName: "BAD_REQUEST"
      })
  }
}
