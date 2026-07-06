import { WebSocket } from "ws";
import { encodeServerMessage } from "../../lib/encodeServerMessage";
import { decodeBinary } from "../../lib/decodeClientMessage";
import { clientMessageSchema } from "@packages/ws-messages";


export const onMessageEvent = (ws: WebSocket) => {
  ws.on("message", (data, isBinary) => {
    if (
      !isBinary ||
      !(data instanceof Buffer)
    ) {
      return ws.send(encodeServerMessage({
        success: false,
        errorMessage: "BAD_REQUEST"
      }));
    }

    const decoded = decodeBinary(data);

    const parsed = clientMessageSchema.safeParse(decoded);
    if (!parsed.success) {
      return ws.send(encodeServerMessage({
        success: false,
        errorMessage: "BAD_REQUEST"
      }))
    }

    // ShogiControllerの操作
  });
}
