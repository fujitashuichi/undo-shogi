import type { ServerMessage } from "@packages/ws-messages";

export const encodeServerMessage = (message: ServerMessage) => {
  const json = JSON.stringify(message);
  return new TextEncoder().encode(json);
}
