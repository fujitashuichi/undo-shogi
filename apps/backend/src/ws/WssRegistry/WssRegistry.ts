import { WebSocketServer } from "ws";
import { Clients } from "../Clients/Clients";
import { Groups } from "../Groups/Groups";
import { MatchingQueue } from "../MatchingQueue/MatchingQueue";
import { Matcher } from "../Matcher/Matcher";
import { setupWssRegistry } from "./setUpWssEvents";
import type { UUID } from "crypto";


export class WssRegistry {
  public readonly wss: WebSocketServer;

  public readonly clients: Clients;
  public readonly groups: Groups;
  public readonly matchingQueue: MatchingQueue;
  public readonly matcher: Matcher;


  constructor(
    wssOptions: ConstructorParameters<typeof WebSocketServer>[0]
  ) {
    this.wss = new WebSocketServer(wssOptions);
    this.clients = new Clients();
    this.groups = new Groups();
    this.matchingQueue = new MatchingQueue();
    this.matcher = new Matcher(this.matchingQueue.queue);

    setupWssRegistry(this);
  }


  public readonly shogiRoom = (groupId: UUID) => {
    return this.groups.group(groupId)?.shogiRoom;
  }
}
