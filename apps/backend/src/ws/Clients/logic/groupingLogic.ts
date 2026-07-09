import type { ClientMessage } from "@packages/ws-messages";
import type { WssRegistry } from "../../WssRegistry/WssRegistry";
import type { Client } from "../Client";


export const groupingLogic = (
  client: Client,
  wssRegistry: WssRegistry,
  message: ClientMessage
) => {
  if (!(
    message.command === "onConnection" ||
    message.command === "joinGroup"
  )) {
    client.send({
      success: false,
      errorMessage: "INTERNAL_ERROR"
    });
  }


  if (message.command === "onConnection") {
    client.send({
      success: true,
      command: "onConnection",
      value: {
        clientId: client.clientId,
        groupId: "unGrouped"
      }
    });
  }

  if (message.command === "joinGroup") {
    // キューに追加
  }
}
