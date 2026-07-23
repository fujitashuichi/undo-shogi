import type { ClientMessage } from "@packages/ws-messages";
import type { Client } from "../../Client";
import { startMatching } from "../logic/startMatching";
import type { WssRegistry } from "../../../WssRegistry/WssRegistry";

export const sessionRouter = (
  client: Client,
  wssRegistry: WssRegistry,
  command: ClientMessage["command"]
) => {
  switch (command) {
    case "startMatching":
      startMatching(client, wssRegistry);
      break;

    case "stopMatching":
      startMatching(client, wssRegistry);
      break;

    default:
      client.send({
        type: "none",
        success: false,
        errorName: "INTERNAL_ERROR"
      });
  }
}
