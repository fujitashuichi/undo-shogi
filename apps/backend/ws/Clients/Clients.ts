import { encodeBinary } from "../lib/encodeBinary";
import { WsClient } from "./WsClient";


export class Clients {
  public readonly all: Set<WsClient> = new Set();

  constructor() {}


  public readonly findById = (
    clientId: WsClient["clientId"]
  ) => {
    return [...this.all].find(client => client.clientId === clientId);
  }


  public readonly addClient = (client: WsClient) => {
    this.all.add(client);
  }

  public readonly removeClient = (client: WsClient) => {
    this.all.delete(client);
  }


  public readonly sendAll = (message: any) => {
    const data = encodeBinary(message);

    this.all.forEach(client => {
      client.ws.send(data);
    });
  }
}
