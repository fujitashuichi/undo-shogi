import type { UUID } from "crypto";
import { WsClient } from "../Clients/WsClient";
import { ShogiRoom } from "./ShogiRoom";
import { encodeBinary } from "../lib/encodeBinary";


type All = Record<
  UUID,
  {
    wsClients: Set<WsClient>,
    shogiRoom: ShogiRoom | null
  }
>;


export class Groups {
  public readonly all: All = {};

  constructor() {}


  public readonly createGroup = (
    groupId: UUID
  ) => {
    if (this.all[groupId]) {
      return console.warn("The group is already created.");
    }

    this.all[groupId] = {
      wsClients: new Set(),
      shogiRoom: null
    }
  }

  public readonly removeGroup = (groupId: UUID) => {
    delete this.all[groupId];
  }


  public readonly addToGroup = (groupId: UUID, client: WsClient) => {
    if (!this.all[groupId]) {
      return console.warn(`Group does not exists: groupId="${groupId}"`);
    }

    this.all[groupId].wsClients.add(client);
    client.groupId = groupId;
  }

  public readonly removeFromGroup = (groupId: UUID, client: WsClient) => {
    if (!this.all[groupId]) {
      return console.warn(`Group does not exists: groupId="${groupId}"`);
    };

    this.all[groupId].wsClients.delete(client);
    client.groupId = null;
  }


  public readonly clients = (groupId: UUID) => {
    return this.all[groupId];
  }

  public readonly sendAll = (groupId: UUID, message: any) => {
    const clients = this.clients(groupId);
    if (!clients) return;

    const data = encodeBinary(message);
    clients.wsClients.forEach(c => {
      c.ws.send(data);
    });
  }


  public readonly shogiRoom = (groupId: UUID) => {
    return this.all[groupId]?.shogiRoom;
  }


  public createShogiRoom = (
    groupId: UUID,
    shogiOptions: ConstructorParameters<typeof ShogiRoom>[0]
  ) => {
    if (!this.all[groupId]) {
      return console.warn(`Group does not exists: groupId="${groupId}"`);
    };

    this.all[groupId].shogiRoom = new ShogiRoom(shogiOptions);
  }
}
