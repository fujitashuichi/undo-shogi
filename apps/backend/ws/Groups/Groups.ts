import type { UUID } from "crypto";
import { Client } from "../Clients/Client";
import { ShogiRoom } from "./ShogiRoom";
import { encodeBinary } from "../lib/encodeBinary";


type Group = {
  clients: Set<Client>,
  shogiRoom: ShogiRoom | null
}

type All = Record<
  UUID,
  Group
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
      clients: new Set(),
      shogiRoom: null
    }
  }

  public readonly removeGroup = (groupId: UUID) => {
    delete this.all[groupId];
  }


  public readonly addToGroup = (groupId: UUID, client: Client) => {
    if (!this.all[groupId]) {
      return console.warn(`Group does not exists: groupId="${groupId}"`);
    }

    this.all[groupId].clients.add(client);
  }

  public readonly removeFromGroup = (groupId: UUID, client: Client) => {
    if (!this.all[groupId]) {
      return console.warn(`Group does not exists: groupId="${groupId}"`);
    };

    this.all[groupId].clients.delete(client);
  }


  public readonly clients = (groupId: UUID) => {
    return this.all[groupId];
  }

  public readonly sendAll = (groupId: UUID, message: any) => {
    const clients = this.clients(groupId);
    if (!clients) return;

    const data = encodeBinary(message);
    clients.clients.forEach(c => {
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

    if (this.all[groupId].shogiRoom) {
      return console.warn(`Shogi room already created at Group: groupId="${groupId}"`);
    };

    this.all[groupId].shogiRoom = new ShogiRoom(shogiOptions);
  }
}
