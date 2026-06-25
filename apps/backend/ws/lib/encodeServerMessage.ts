import type { ServerMessage } from "../../../../packages/ws-messages/dist";

export const encodeServerMessage = (message: ServerMessage) => {
  const json = JSON.stringify(message);
  return new TextEncoder().encode(json);
}
