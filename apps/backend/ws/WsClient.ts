import type { UUID } from "crypto";
import { WebSocket } from "ws";
import { encodeBinary } from "./lib/encodeBinary";
import { decodeBinary } from "./lib/decodeBinary";
import type { WssRegistry } from "./WssRegistry";


const setupWsEvents = (
  wssRegistry: WssRegistry,
  ws: WebSocket,
  groupId: UUID | "unGrouped",
  clientId: UUID
) => {
  ws.on("close", async () => {
    await wssRegistry.removeFromGroupAsync(groupId, clientId);
  });

  ws.on("error", () => {
    ws.close();
  });

  ws.on("message", (data, isBinary) => {
      if (!isBinary) {
        return ws.send(encodeBinary("BAD_REQUEST"));
      }

      if (data instanceof ArrayBuffer) {
        const decoded = decodeBinary(data);

        // ShogiControllerの操作
      }
    }
  );
}


export class WsClient {
  private groupId: UUID | "unGrouped" = "unGrouped";

  constructor (
    public readonly clientId: UUID,
    public readonly ws: WebSocket,
    private readonly wssRegistry: WssRegistry,
    groupId: UUID | "unGrouped"
  ) {
    this.groupId = groupId;
    setupWsEvents(wssRegistry, ws, groupId, clientId);
  }


  public readonly addMeToGroup = (groupId: UUID) => {
    this.groupId = groupId;
    setupWsEvents(this.wssRegistry, this.ws, this.groupId, this.clientId);
  }

  public readonly removeMeFromGroup = () => {
    this.groupId = "unGrouped";
    setupWsEvents(this.wssRegistry, this.ws, this.groupId, this.clientId);
  }
}
