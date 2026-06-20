import { WsClient } from "./WsClient";
import type { UUID } from "crypto";
import { encodeBinary } from "./lib/encodeBinary";
import { WebSocketServer } from "ws";
import { ShogiRoom } from "./ShogiRoom";


type Groups = Record<
  UUID,
  {
    wsClients: Set<WsClient>,
    shogiRoom: ShogiRoom
  }
>;


export class WssRegistry {
  public readonly wss: WebSocketServer;

  public readonly clients: Set<WsClient>;

  public readonly groups: Groups;
  public readonly unGrouped: Set<WsClient>;


  constructor(
    wssOptions: ConstructorParameters<typeof WebSocketServer>[0]
  ) {
    this.wss = new WebSocketServer(wssOptions);
    this.clients = new Set();
    this.groups = {};
    this.unGrouped = new Set();
  }


  public readonly addClient = (client: WsClient) => {
    this.clients.add(client);
    this.unGrouped.add(client);
  }

  public readonly removeClient = (clientId: WsClient["clientId"]) => {
    const target = this.findClientById(clientId);
    if (!target) return;

    const groupId = target.groupId;
    if (groupId !== "unGrouped" && this.groups[groupId]) {
      this.groups[groupId].wsClients.delete(target);
    }

    this.unGrouped.delete(target);
    this.clients.delete(target);
  }


  public readonly findClientById = (
    clientId: WsClient["clientId"]
  ) => {
    return Array.from(this.clients).find(client => client.clientId === clientId);
  }

  public readonly findClientsInGroup = async (groupId: UUID) => {
    if (!this.groups[groupId]) {
      return [];
    }

    return this.groups[groupId].wsClients;
  }


  public readonly addToGroup = (groupId: UUID, clientId: WsClient["clientId"]) => {
    const client = this.findClientById(clientId);
    if (!client) return;

    if (!this.groups[groupId]) {
      return console.warn(`Group does not exists: groupId="${groupId}"`);
    }

    this.unGrouped.delete(client);
    this.groups[groupId].wsClients.add(client);

    client.addMeToGroup(groupId);
  }

  public readonly removeFromGroup = (groupId: UUID, clientId: WsClient["clientId"]) => {
    const client = this.findClientById(clientId);
    if (!client) return;

    if (!this.groups[groupId]) {
      return console.warn(`Group does not exists: groupId="${groupId}"`);
    };

    this.groups[groupId].wsClients.delete(client);
    this.unGrouped.add(client);

    client.removeMeFromGroup();
  }


  public readonly createGroup = (
    groupId: UUID,
    shogiOptions: ConstructorParameters<typeof ShogiRoom>[0]
  ) => {
    const shogiRoom = new ShogiRoom(shogiOptions);

    if (this.groups[groupId]) {
      return console.warn("The group is already created.");
    }

    this.groups[groupId] = {
      wsClients: new Set(),
      shogiRoom
    }
  }


  public readonly sendAll = (message: any) => {
    const data = encodeBinary(message);

    this.clients.forEach(client => {
      client.ws.send(data);
    });
  }
}
