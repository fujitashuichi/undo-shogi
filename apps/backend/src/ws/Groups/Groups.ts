import type { UUID } from "node:crypto";
import type { Group } from "./Group";
import { logger } from "@packages/tools";


export class Groups {
  public readonly all: Record<UUID, Group> = {};


  public readonly group = (groupId: UUID) => {
    return this.all[groupId];
  }

  public readonly createGroup = (groupId: UUID, group: Group) => {
    if (this.all[groupId]) {
      return logger.warn("The group is already created.");
    }

    this.all[groupId] = group;
  }

  public readonly removeGroup = (groupId: UUID) => {
    delete this.all[groupId];
  }
}
