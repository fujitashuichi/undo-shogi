import type { ServerMessage } from "../types/serverMessage.types";

export const encodeServerMessage = (message: ServerMessage) => {
  const json = JSON.stringify(message);
  return new TextEncoder().encode(json);
}
