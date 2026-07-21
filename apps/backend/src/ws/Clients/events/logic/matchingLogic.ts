import type { ClientMessage } from "@packages/ws-messages";
import type { Client } from "../../Client";
import type { WssRegistry } from "../../../WssRegistry/WssRegistry";
import { stopMatching } from "./stopMatching";
import { startMatching } from "./startMatching";


export const matchingLogic = (
  client: Client,
  wssRegistry: WssRegistry,
  message: ClientMessage
) => {
  if (message.command === "stopMatching") {
    return stopMatching(client, wssRegistry);
  }

  if (message.command === "startMatching") {
    return startMatching(client, wssRegistry);
  }

  return client.send({
    success: false,
    errorName: "INTERNAL_ERROR"
  });
}
