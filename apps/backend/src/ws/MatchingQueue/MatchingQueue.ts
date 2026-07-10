import type { Client } from "../Clients/Client";

export class MatchingQueue {
  private _queue: Set<Client> = new Set();

  constructor() {}


  public get queue() {
    return this._queue;
  }

  public add = (client: Client) => {
    this.queue.add(client);
  }

  public remove = (client: Client) => {
    this.queue.delete(client);
  }
}
