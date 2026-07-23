import { z } from "zod";
import { clientShogiMessageSchema } from "./shogiMessage.js";
import { clientSessionMessageSchema } from "./sessionMessage.js";


export const clientMessageSchema = z.union([
  clientShogiMessageSchema,
  clientSessionMessageSchema
]);
export type ClientMessage = z.infer<typeof clientMessageSchema>;
