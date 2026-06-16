import { WebSocket, WebSocketServer } from "ws";
import type { Connections } from "./types";
import { decodeBinary } from "./lib/decodeBinary";
import { encodeBinary } from "./lib/encodeBinary";


const setupWsEvents = (ws: WebSocket) => {
  ws.on("close", () => {});

  ws.on("error", () => {
    ws.close();
  });

  ws.on("message", (data, isBinary) => {
      if (!isBinary) {
        return ws.send(encodeBinary("BAD_REQUEST"));
      }

      if (data instanceof ArrayBuffer) {
        const decoded = decodeBinary(data);

        // ShogiControllerの操作
      }
    }
  );
}


export const setupWssEvents = (wss: WebSocketServer, connections: Connections) => {
  wss.on("connection", (ws) => {
    const connectionId = crypto.randomUUID();
    connections[connectionId] = ws;

    setupWsEvents(ws);
  });
}
