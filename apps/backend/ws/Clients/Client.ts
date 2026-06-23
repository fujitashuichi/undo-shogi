import type { UUID } from "crypto";
import { WebSocket } from "ws";
import type { WssRegistry } from "../WssRegistry/WssRegistry";
import { setupWsEvents } from "./setUpWsEvents";


export class Client {
  constructor (
    public readonly clientId: UUID,
    public readonly ws: WebSocket,
    wssRegistry: WssRegistry
  ) {
    setupWsEvents(this, wssRegistry, ws);
  }
}
