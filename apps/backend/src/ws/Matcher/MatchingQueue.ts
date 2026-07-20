import type { Client } from "../Clients/Client";

export class MatchingQueue {
  private _queue: Array<Client> = [];


  public get items(): Readonly<Array<Client>> {
    return this._queue;
  }

  public get size() {
    return this._queue.length;
  }

  public readonly has = (client: Client) => {
    return this._queue.includes(client);
  }


  public add = (client: Client) => {
    if (this.has(client)) return;
    this._queue.push(client);
  }

  public remove = (client: Client) => {
    this._queue = this._queue.filter(c => c.clientId !== client.clientId);
  }
}
