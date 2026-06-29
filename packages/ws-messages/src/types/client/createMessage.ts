import type { z } from "zod";
import type { Command } from "../command.types.js";
import type { ClientMessage } from "./message.types.js";
import { bodySchemaMap } from "./body.types.js";

export const createMessage = <T extends Command>(
  command: T,
  body: z.infer<typeof bodySchemaMap[T]>
): ClientMessage => {
  return {
    header: {
      command
    },
    body
  };
};
