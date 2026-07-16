import type { UUID } from "node:crypto";
import type { WssRegistry } from "../../../WssRegistry/WssRegistry";
import type { Client } from "../../Client";
import { Group } from "../../../Groups/Group";


type Result =
| { success: false }
| {
  success: true,
  groupId: UUID,
  clients: Group["clients"]
}


export const matching = (
  wssRegistry: WssRegistry,
  client: Client
): Result => {
  return wssRegistry.matcher.tryMatch({
    client,
    onMatched: (clients) => {
      const groupId = crypto.randomUUID();
      wssRegistry.groups.createGroup(
        groupId, new Group(clients)
      );

      return {
        success: true,
        groupId: groupId,
        clients
      }
    },
    onFailure: () => {
      return { success: false }
    }
  });
}
