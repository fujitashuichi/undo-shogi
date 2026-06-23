import { Client } from "../Clients/Client";
import type { WssRegistry } from "./WssRegistry";

export const setupWssRegistry = (wssRegistry: WssRegistry) => {
  const wss = wssRegistry.wss;

  wss.on("connection", (ws) => {
    const clientId = crypto.randomUUID();

    const client = new Client(clientId, ws, wssRegistry);
    wssRegistry.clients.addClient(client);
  });
}
