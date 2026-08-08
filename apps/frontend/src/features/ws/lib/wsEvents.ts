import { logger } from "@packages/tools";
import { onMessageEvent } from "./onMessageEvent";
import { SocketStatusCtx } from "../contexts/socketStatus";


export const setupWsEvents = (
  ws: WebSocket,
  setStatus: SocketStatusCtx["setStatus"],
  setLastMessage: SocketStatusCtx["setLastMessage"]
) => {
  ws.onopen = () => {
    setStatus("opened");
    logger.info("Connection opened successfully.");
  }

  ws.onclose = () => {
    setStatus("closed");
    logger.info("Connection closed.");
  }

  ws.onerror = () => {
    setStatus("closed");
    logger.info("Connection error.");
  }

  ws.onmessage = (event) => {
    onMessageEvent(event.data, setLastMessage);
  }
}
