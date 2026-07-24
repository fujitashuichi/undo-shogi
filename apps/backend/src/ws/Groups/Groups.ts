import type { UUID } from "node:crypto";
import type { Group } from "./Group";
import { logger } from "@packages/tools";
import type { Client } from "../Clients/Client";


export class Groups {
  public readonly all: Set<Group> = new Set();
  private readonly groups: Group[] = [];


  public readonly group = (groupId: UUID) => {
    return [...this.all].find(g => g.groupId === groupId);
  }

  public readonly findByClient = (client: Client) => {
    return [...this.all].find(g => g.clientIds.includes(client.clientId));
  }

  public readonly createGroup = (groupId: UUID, group: Group) => {
    if (this.group(groupId)) {
      return logger.warn("The group is already created.");
    }

    this.all.add(group);
    this.groups.push(group);
  }

  public readonly removeGroup = (groupId: UUID) => {
    const target = this.group(groupId);
    if (!target) {
      return logger.warn("The group has not been created.");
    }

    this.all.delete(target);
  }
}
