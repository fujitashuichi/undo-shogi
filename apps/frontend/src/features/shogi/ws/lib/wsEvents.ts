import { logger } from "@packages/tools";
import { onMessageEvent } from "./onMessageEvent";
import { ShogiCtx } from "../../contexts/shogiCtx";


export const setupWsEvents = (
  ws: WebSocket,
  shogiCtx: ShogiCtx
) => {
  const { socketStatusCtx } = shogiCtx;
  const { setStatus } = socketStatusCtx;

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
    onMessageEvent(event.data, shogiCtx);
  }
}
