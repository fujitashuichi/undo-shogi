import type { UUID } from "node:crypto";
import type { Group } from "./Group";

export class ClientGroupMap {
  private readonly map: {
    [clientId: UUID]: Group
  } = {};


  public readonly add = (clientId: UUID, group: Group) => {
    this.map[clientId] = group;
  }

  public readonly remove = (clientId: UUID) => {
    delete this.map[clientId];
  }
}
