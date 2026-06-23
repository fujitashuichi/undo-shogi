import { decodeBinary } from "../lib/decodeClientMessage";
import { encodeServerMessage } from "../lib/encodeServerMessage";
import { clientMessageSchema } from "../types/clientMessage.types";
import type { WssRegistry } from "../WssRegistry/WssRegistry";
import type { Client } from "./Client";


export const setupWsEvents = (
  client: Client,
  wssRegistry: WssRegistry
) => {
  const ws = client.ws;

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
        return ws.send(encodeServerMessage({
          success: false,
          errorMessage: "BAD_REQUEST"
        }));
      }

      const decoded = decodeBinary(data);

      const parsed = clientMessageSchema.safeParse(decoded);
      if (!parsed.success) {
        return ws.send(encodeServerMessage({
          success: false,
          errorMessage: "BAD_REQUEST"
        }))
      }

      // ShogiControllerの操作
    }
  );
}
