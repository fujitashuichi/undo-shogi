import { decodeBinary } from "../../../lib/decodeClientMessage";
import { clientMessageSchema } from "@packages/ws-messages";
import type { Client } from "../Client";
import type { WssRegistry } from "../../WssRegistry/WssRegistry";
import { messageRouter } from "./router/messageRouter";

export const onMessageEvent = (client: Client, wssRegistry: WssRegistry) => {
  const ws = client.ws;

  ws.on("message", (data, isBinary) => {
    if (
      !isBinary ||
      !(data instanceof Buffer)
    ) {
      return client.send({
        type: "none",
        success: false,
        errorName: "BAD_REQUEST"
      });
    }

    const decoded = decodeBinary(data);

    const parsed = clientMessageSchema.safeParse(decoded);
    if (!parsed.success) {
      return client.send({
        type: "none",
        success: false,
        errorName: "BAD_REQUEST"
      });
    };

    const message = parsed.data;

    messageRouter(message, client, wssRegistry);
  });
}
