import type { Client } from "../Clients/Client";
import type { MatchingQueue } from "../MatchingQueue/MatchingQueue";
import { choiceRandomFromArray } from "../Clients/logic/matching/choiceRandomFromSet";
import type { Side } from "@packages/shogi";


export class Matcher {
  constructor(
    private readonly queue: MatchingQueue["queue"]
  ) {}

  public readonly tryMatch = <T, U>({ client, onMatched, onFailure }: {
    client: Client,
    onMatched: (clients: Record<Side, Client>) => T,
    onFailure: () => U
  }): T | U => {
    if (!this.queue.has(client)) {
      this.queue.add(client);
    }

    if (this.queue.size === 1) {
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

    this.queue.delete(client);
    this.queue.delete(matchedClient);

    return onMatched(clients);
  }
}
