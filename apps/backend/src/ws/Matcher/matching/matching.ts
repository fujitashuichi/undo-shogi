import type { UUID } from "node:crypto";
import { Group } from "../../Groups/Group";
import { WssRegistry } from "../../WssRegistry/WssRegistry";
import { Client } from "../../Clients/Client";


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
