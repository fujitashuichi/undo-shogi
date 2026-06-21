import { decodeBinary } from "../lib/decodeBinary";
import { encodeBinary } from "../lib/encodeBinary";
import type { ServerMessage } from "../types/serverMessage.types";
import type { WssRegistry } from "../WssRegistry/WssRegistry";
import type { WsClient } from "./WsClient";
import { WebSocket } from "ws";


export const setupWsEvents = (
  client: WsClient,
  wssRegistry: WssRegistry,
  ws: WebSocket
) => {
  ws.on("close", () => {
    if (client) {
      wssRegistry.clients.removeClient(client);
    }
  });

  ws.on("error", () => {
    ws.close();
  });

  ws.on("message", (data, isBinary) => {
      if (
        !isBinary ||
        !(data instanceof Buffer)
      ) {
        const message: ServerMessage = {
          success: false,
          errorMessage: "BAD_REQUEST"
        }
        return ws.send(encodeBinary(message));
      }

      const decoded = decodeBinary(data);

      // ShogiControllerの操作
    }
  );
}
