import { decodeBinary } from "../../../lib/decodeClientMessage";
import { clientMessageSchema, type ClientMessage } from "@packages/ws-messages";
import type { Client } from "../Client";
import { shogiLogic } from "./logic/shogiLogic";
import type { WssRegistry } from "../../WssRegistry/WssRegistry";
import { matchingLogic } from "./logic/matchingLogic";


const messageRouter = (
  message: ClientMessage,
  client: Client,
  wssRegistry: WssRegistry
) => {
  switch (message.command) {
    case "onConnection":
      client.send({
        success: true,
        command: "onConnection",
        value: {
          clientId: client.clientId,
          groupId: "unGrouped"
        }
      });
      break;

    case "matching":
      matchingLogic(client, wssRegistry, message);
      break;

    default:
      shogiLogic(client, message);
      break;
  }
}


export const onMessageEvent = (client: Client, wssRegistry: WssRegistry) => {
  const ws = client.ws;

  ws.on("message", (data, isBinary) => {
    if (
      !isBinary ||
      !(data instanceof Buffer)
    ) {
      return client.send({
        success: false,
        errorMessage: "BAD_REQUEST"
      });
    }

    const decoded = decodeBinary(data);

    const parsed = clientMessageSchema.safeParse(decoded);
    if (!parsed.success) {
      return client.send({
        success: false,
        errorMessage: "BAD_REQUEST"
      });
    };

    const message = parsed.data;

    messageRouter(message, client, wssRegistry);
  });
}
