import type { ServerMessage } from "@packages/ws-messages";
import type { Client } from "../Clients/Client";
import { ShogiRoom } from "./ShogiRoom";
import { encodeServerMessage } from "../../lib/encodeServerMessage";
import type { UUID } from "node:crypto";


type Clients = {
  Sente: Client,
  Gote: Client
};


export class Group {
  public shogiRoom: ShogiRoom | null = null;

  constructor(
    public readonly groupId: UUID,
    public readonly clients: Clients
  ) {}


  public get clientIds() {
    return [
      this.clients.Sente.clientId,
      this.clients.Gote.clientId
    ];
  }

  public readonly sendAll = (message: ServerMessage) => {
    const clients = this.clients;
    if (!clients) return;

    const data = encodeServerMessage(message);
    [clients.Sente, clients.Gote].forEach(client => {
      client.ws.send(data);
    });
  }

  public createShogiRoom = (
    groupId: UUID,
    shogiOptions: ConstructorParameters<typeof ShogiRoom>[0]
  ) => {
    if (this.shogiRoom) {
      return console.warn(`Shogi room already created at Group: groupId="${groupId}"`);
    };

    this.shogiRoom = new ShogiRoom(shogiOptions);
  }
}
