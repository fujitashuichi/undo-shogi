import type { ServerMessage } from "@packages/ws-messages";
import { Client } from "./Client";
import { encodeServerMessage } from "../../lib/encodeServerMessage";


export class Clients {
  public readonly all: Set<Client> = new Set();


  public readonly findById = (
    clientId: Client["clientId"]
  ) => {
    return [...this.all].find(client => client.clientId === clientId);
  }


  public readonly addClient = (client: Client) => {
    this.all.add(client);
  }

  public readonly removeClient = (client: Client) => {
    this.all.delete(client);
  }


  public readonly sendAll = (message: ServerMessage) => {
    const data = encodeServerMessage(message);

    this.all.forEach(client => {
      client.ws.send(data);
    });
  }
}
