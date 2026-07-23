import type { ClientMessage } from "@packages/ws-messages";
import type { WssRegistry } from "../../../WssRegistry/WssRegistry";
import type { Client } from "../../Client";

export const shogiRouter = (
  client: Client,
  wssRegistry: WssRegistry,
  command: ClientMessage["command"]
) => {
  switch (command) {
    case "movePiece":
      break;

    case "dropPiece":
      break;

    case "undo":
      break;

    case "startGame":
      break;

    case "stopGame":
      break;

    default:
      client.send({
        type: "none",
        success: false,
        errorName: "INTERNAL_ERROR"
      });
  }
}
