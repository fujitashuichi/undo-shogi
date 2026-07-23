import type { WssRegistry } from "../../../WssRegistry/WssRegistry";
import type { Client } from "../../Client";
import { Group } from "../../../Groups/Group";

export const startMatching = (
  client: Client,
  wssRegistry: WssRegistry
) => {
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
            type: "session",
            success: true,
            command: "matched",
            body: {
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
