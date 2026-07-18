import type { UUID } from "node:crypto";
import { WebSocket } from "ws";
import type { WssRegistry } from "../WssRegistry/WssRegistry";
import { setupWsEvents } from "./events/setUpWsEvents";
import { encodeServerMessage } from "../../lib/encodeServerMessage";
import type { ServerMessage } from "@packages/ws-messages";

export class Client {
  constructor (
    public readonly clientId: UUID,
    public readonly ws: WebSocket,
    wssRegistry: WssRegistry
  ) {
    setupWsEvents(this, wssRegistry);
  }

  public readonly send = (message: ServerMessage) => {
    const data = encodeServerMessage(message);
    this.ws.send(data);
  }
}
