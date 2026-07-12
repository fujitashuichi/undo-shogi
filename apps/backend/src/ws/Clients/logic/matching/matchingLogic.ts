import type { ClientMessage } from "@packages/ws-messages";
import type { WssRegistry } from "../../../WssRegistry/WssRegistry";
import type { Client } from "../../Client";
import { matching } from "./matching";


export const matchingLogic = (
  client: Client,
  wssRegistry: WssRegistry,
  message: ClientMessage
) => {
  if (message.command !== "matching") {
    return client.send({
      success: false,
      errorMessage: "INTERNAL_ERROR"
    });
  }


  wssRegistry.matchingQueue.add(client);
  const result = matching(wssRegistry, client);

  if (!result.success) {
    return client.send({
      success: true,
      command: "matching",
      value: {
        clientId: client.clientId,
        groupId: "unMatched"
      }
    });
  }

  return client.send({
    success: true,
    command: "matching",
    value: {
      clientId: client.clientId,
      groupId: result.groupId
    }
  })
}
