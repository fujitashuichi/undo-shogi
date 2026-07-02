import { WebSocketServer } from "ws";
import { Clients } from "../Clients/Clients";
import { Groups } from "../Groups/Groups";
import { setupWssRegistry } from "./setUpWssEvents";
import type { UUID } from "crypto";


export class WssRegistry {
  public readonly wss: WebSocketServer;

  public readonly clients: Clients;
  public readonly groups: Groups;


  constructor(
    wssOptions: ConstructorParameters<typeof WebSocketServer>[0]
  ) {
    this.wss = new WebSocketServer(wssOptions);
    this.clients = new Clients();
    this.groups = new Groups();

    setupWssRegistry(this);
  }


  public readonly shogiRoom = (groupId: UUID) => {
    return this.groups.shogiRoom(groupId);
  }
}
