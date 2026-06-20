import type { UUID } from "crypto";
import { WebSocket } from "ws";
import { encodeBinary } from "../lib/encodeBinary";
import { decodeBinary } from "../lib/decodeBinary";
import type { WssRegistry } from "../WssRegistry/WssRegistry";


const setupWsEvents = (
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
        return ws.send(encodeBinary("BAD_REQUEST"));
      }

      const decoded = decodeBinary(data);

      // ShogiControllerの操作
    }
  );
}


export class WsClient {
  constructor (
    public readonly clientId: UUID,
    public readonly ws: WebSocket,
    private readonly wssRegistry: WssRegistry,
    public groupId: UUID | null
  ) {
    this.groupId = groupId;
    setupWsEvents(this, wssRegistry, ws);
  }
}
