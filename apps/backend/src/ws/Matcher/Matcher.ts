import type { Client } from "../Clients/Client";
import { getRandomInt } from "./matching/choiceRandomFromSet";
import type { MatchingQueue } from "./MatchingQueue";
import type { Side } from "@packages/shogi";


export class Matcher {
  constructor(
    private readonly queue: MatchingQueue
  ) {}


  public readonly enqueue = (client: Client) => {
    this.queue.add(client);
  }

  public readonly dequeue = (client: Client) => {
    this.queue.remove(client);
  }


  public readonly tryMatch = <T, U>({ client, onMatched, onFailure }: {
    client: Client,
    onMatched: (clients: Record<Side, Client>) => T,
    onFailure: () => U
  }): T | U => {
    if (!this.queue.has(client) || this.queue.size === 1) {
      return onFailure();
    }


    const matchedClient = this.queue.items[
      getRandomInt(this.queue.size)
    ];

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
