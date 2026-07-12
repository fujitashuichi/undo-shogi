import type { UUID } from "crypto";
import type { WssRegistry } from "../../../WssRegistry/WssRegistry";
import type { Client } from "../../Client";
import { choiceRandomFromSet } from "./choiceRandomFromSet";
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
  if (wssRegistry.matchingQueue.queue.size === 1) {
    return { success: false };
  }

  const matchedClient = choiceRandomFromSet(wssRegistry.matchingQueue.queue);
  if (!matchedClient) {
    return { success: false };
  }


  // ひとまず、マッチ申請を行った側を先手とする
  const clients = {
    Sente: client,
    Gote: matchedClient
  };

  const groupId = crypto.randomUUID();
  wssRegistry.groups.createGroup(groupId, new Group(clients));

  return {
    success: true,
    groupId,
    clients
  }
}
