import { WebSocketServer } from "ws";
import { setupWssEvents } from "./setupEvents";
import type { Connections } from "./types";
import { encodeBinary } from "./lib/encodeBinary";


export class ConnectionRegistry {
  private connections: Connections = {};
  public readonly wss: WebSocketServer;


  constructor(
    wssOptions: ConstructorParameters<typeof WebSocketServer>[0]
  ) {
    this.wss = new WebSocketServer(wssOptions);
    setupWssEvents(this.wss, this.connections);
  }


  public readonly sendAll = (message: any) => {
    const data = encodeBinary(message);

    this.wss.clients.forEach((client) => {
      client.send(data);
    });
  }

  public readonly closeWss = () => {
    this.wss.close();
  }
}
