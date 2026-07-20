import type { ClientMessage } from "@packages/ws-messages";
import type { Client } from "../../Client";
import type { WssRegistry } from "../../../WssRegistry/WssRegistry";
import { Group } from "../../../Groups/Group";


export const matchingLogic = (
  client: Client,
  wssRegistry: WssRegistry,
  message: ClientMessage
) => {
  if (message.command !== "matching") {
    return client.send({
      success: false,
      errorMessage: "INTERNAL_ERROR"
    });
  }


  wssRegistry.matcher.enqueue(client);

  wssRegistry.matcher.tryMatching({
    onMatched: (pairs) => {
      pairs.forEach(pair => {
        const groupId = crypto.randomUUID();
        wssRegistry.groups.createGroup(
          groupId, new Group(pair)
        );

        [pair.Sente, pair.Gote].forEach(c => {
          c.send({
            success: true,
            command: "matching",
            value: {
              clientId: c.clientId,
              groupId: groupId
            }
          })
        });
      }
    )},
    onFailure: () => {}
  });
}
