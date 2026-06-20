import { WebSocketServer } from "ws";
import { Clients } from "./Clients";
import { Groups } from "./Groups";


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
  }
}
