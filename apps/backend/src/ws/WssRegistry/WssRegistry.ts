import { WebSocketServer } from "ws";
import { Clients } from "../Clients/Clients";
import { Groups } from "../Groups/Groups";
import { Matcher } from "../Matcher/Matcher";
import { setupWssRegistry } from "./setUpWssEvents";


export class WssRegistry {
  public readonly wss: WebSocketServer;

  public readonly clients: Clients;
  public readonly groups: Groups;
  public readonly matcher: Matcher;


  constructor(
    wssOptions: ConstructorParameters<typeof WebSocketServer>[0]
  ) {
    this.wss = new WebSocketServer(wssOptions);
    this.clients = new Clients();
    this.groups = new Groups();
    this.matcher = new Matcher();

    setupWssRegistry(this);
  }
}
