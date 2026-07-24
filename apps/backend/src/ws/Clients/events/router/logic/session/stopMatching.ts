import type { WssRegistry } from "../../../../../WssRegistry/WssRegistry";
import type { Client } from "../../../../Client";

export const stopMatching = (
  client: Client,
  wssRegistry: WssRegistry
) => {
  wssRegistry.matcher.dequeue(client);
}
