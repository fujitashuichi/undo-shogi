import { WsClient } from "./WsClient";
import type { WssRegistry } from "./WssRegistry";

export const setupWssEvents = (wssRegistry: WssRegistry) => {
  const wss = wssRegistry.wss;

  wss.on("connection", (ws) => {
    const clientId = crypto.randomUUID();

    const wsClient = new WsClient(clientId, ws, wssRegistry, null);
    wssRegistry.clients.addClient(wsClient);
  });
}
