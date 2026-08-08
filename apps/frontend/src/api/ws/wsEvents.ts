import { logger } from "@packages/tools";
import { onMessageEvent } from "./onMessageEvent";

export const setupWsEvents = (ws: WebSocket) => {
  ws.onopen = () => {
    logger.info("Connection opened successfully.");
  }

  ws.onclose = () => {
    logger.info("Connection closed.");
  }

  ws.onerror = () => {
    logger.info("Connection error.");
  }

  ws.onmessage = (event) => {
    onMessageEvent(event.data);
  }
}
