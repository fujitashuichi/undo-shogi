import type { Client } from "../Clients/Client";

export class MatchingQueue {
  private readonly _queue: Set<Client> = new Set();


  public get queue() {
    return [...this._queue];
  }

  public add = (client: Client) => {
    this._queue.add(client);
  }

  public remove = (client: Client) => {
    this._queue.delete(client);
  }
}
