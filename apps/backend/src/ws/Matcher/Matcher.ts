import type { Client } from "../Clients/Client";
import type { Group } from "../Groups/Group";
import { matchingFromQueue } from "./matchingFromQueue";
import { MatchingQueue } from "./MatchingQueue";
import type { Side } from "@packages/shogi";


export type Pair = Group["clients"];


export class Matcher {
  private readonly queue = new MatchingQueue();


  public get clients() {
    return this.queue.items;
  }

  public readonly enqueue = (client: Client) => {
    this.queue.add(client);
  }

  public readonly dequeue = (client: Client) => {
    this.queue.remove(client);
  }


  public readonly tryMatching = ({ onMatched, onFailure }: {
    onMatched: (pairs: Pair[]) => void,
    onFailure: () => void
  }): void => {
    if (this.queue.size > 2) {
      return onFailure();
    }

    const pairs: Record<Side, Client>[] = [];
    matchingFromQueue(this.queue, pairs);

    if (pairs.length === 0) {
      return onFailure();
    }

    pairs.forEach(pair => {
      this.dequeue(pair.Sente);
      this.dequeue(pair.Gote);
    });

    onMatched(pairs);
  }
}
