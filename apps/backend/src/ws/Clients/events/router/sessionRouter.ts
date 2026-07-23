import type { ClientSessionMessage } from "@packages/ws-messages";
import type { Client } from "../../Client";
import { startMatching } from "./logic/session/startMatching";
import type { WssRegistry } from "../../../WssRegistry/WssRegistry";

export const sessionRouter = (
  client: Client,
  wssRegistry: WssRegistry,
  message: ClientSessionMessage
) => {
  if (message.command === "startMatching") {
    return startMatching(client, wssRegistry);
  }

  if (message.command === "stopMatching") {
    return startMatching(client, wssRegistry);
  }
}
