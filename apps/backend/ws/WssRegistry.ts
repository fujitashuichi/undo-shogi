import { WsClient } from "./WsClient";
import type { UUID } from "crypto";
import { encodeBinary } from "./lib/encodeBinary";
import { WebSocketServer } from "ws";
import { ShogiRoom } from "./ShogiRoom";


export class WssRegistry {
  public readonly wss: WebSocketServer;

  public readonly clients: WsClient[];
  public readonly groups: Record<
    UUID,
    {
      wsClients: WsClient[],
      shogiRoom: ShogiRoom
    }
  > & {
    unGrouped: { wsClients: WsClient[] }
  };


  constructor(
    wssOptions: ConstructorParameters<typeof WebSocketServer>[0]
  ) {
    this.wss = new WebSocketServer(wssOptions);
    this.clients = [];
    this.groups = {
      unGrouped: { wsClients: [] }
    };
  }


  public findClientByIdAsync = async (clientId: WsClient["clientId"]) => {
    return await new Promise<
      WsClient | undefined
    >((resolve, reject) => {
      try {
        resolve(
          this.clients.find(client => client.clientId === clientId)
        );
      } catch(err) {
        reject(err);
      }
    });
  }

  public findClientsInGroupAsync = async (groupId: UUID) => {
    return await new Promise<
      WsClient[]
    >((resolve, reject) => {
      try {
        if (!this.groups[groupId]) {
          resolve([]);
        } else {
          resolve(this.groups[groupId]["wsClients"]);
        }
      } catch (err) {
        reject(err);
      }
    });
  }


  public readonly addToGroupAsync = async (groupId: UUID, clientId: WsClient["clientId"]) => {
    const client = await this.findClientByIdAsync(clientId);
    if (!client) return;

    client.addMeToGroup(groupId);

    if (this.groups[groupId] && client) {
      this.groups[groupId]["wsClients"].push(client);
    }
  }

  public readonly removeFromGroupAsync = async (groupId: UUID | "unGrouped", clientId: WsClient["clientId"]) => {
    const client = await this.findClientByIdAsync(clientId);
    if (!client) return;

    client.removeMeFromGroup();

    if (!this.groups[groupId]) {
      return;
    } else {
      this.groups[groupId]["wsClients"] = this.groups[groupId]["wsClients"].filter(client => client.clientId !== clientId);
    }
  }


  public readonly createGroupAsync = (
    groupId: UUID,
    shogiOptions: ConstructorParameters<typeof ShogiRoom>[0]
  ) => {
    const shogiRoom = new ShogiRoom(shogiOptions);

    if (this.groups[groupId]) {
      console.warn("The group is already created.");
      return;
    }

    this.groups[groupId] = {
      wsClients: [],
      shogiRoom
    }
  }


  public readonly sendAllAsync = async (message: any) => {
    const data = encodeBinary(message);

    this.clients.forEach(client => {
      client.ws.send(data);
    });
  }
}
