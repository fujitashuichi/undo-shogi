import type { WssRegistry } from "../../WssRegistry/WssRegistry";
import type { Client } from "../Client";
import { onMessageEvent } from "./onMessageEvent";
import { logger } from "@packages/tools";


const setEvents = (
  client: Client,
  wssRegistry: WssRegistry,
  setAlive: (boolean: boolean) => void,
  removeClient: () => void
) => {
  const ws = client.ws;

  ws.on("pong", () => {
    setAlive(true);
  });

  ws.on("close", () => {
    removeClient();
    logger.info(`client "${client.clientId}" closed.`);
  });

  ws.on("error", () => {
    removeClient();
  });

  onMessageEvent(client, wssRegistry);
}


export const setupWsEvents = (
  client: Client,
  wssRegistry: WssRegistry
) => {
  const ws = client.ws;
  let alive: boolean = true;

  const setAlive = (boolean: boolean) => {
    alive = boolean;
  }


  const checkAlive = setInterval(() => {
    if (!alive) {
      return removeClient();
    }

    setAlive(false);
    ws.ping();
  }, 5000);


  const removeClient = () => {
    wssRegistry.matcher.dequeue(client);
    wssRegistry.clients.removeClient(client);

    setAlive(false);
    clearInterval(checkAlive);
    ws.terminate();
  }


  setEvents(client, wssRegistry, setAlive, removeClient);
}
