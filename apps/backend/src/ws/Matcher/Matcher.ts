import type { Client } from "../Clients/Client";
import { choiceRandomFromArray } from "./matching/choiceRandomFromSet";
import type { MatchingQueue } from "./MatchingQueue";
import type { Side } from "@packages/shogi";


export class Matcher {
  constructor(
    public readonly matchingQueue: MatchingQueue
  ) {}


  public get queue() {
    return this.matchingQueue.queue;
  }

  public readonly tryMatch = <T, U>({ client, onMatched, onFailure }: {
    client: Client,
    onMatched: (clients: Record<Side, Client>) => T,
    onFailure: () => U
  }): T | U => {
    if (!this.queue.includes(client) || this.queue.length === 1) {
      return onFailure();
    }


    const matchedClient = choiceRandomFromArray(
      [...this.queue].filter(c => c.clientId !== client.clientId)
    );

    if (!matchedClient) {
      return onFailure();
    }


    // ひとまず、マッチ申請を行った側を先手とする
    const clients = {
      Sente: client,
      Gote: matchedClient
    };

    return onMatched(clients);
  }
}
