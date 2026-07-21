import { z } from "zod";
import { shogiMessageSchema } from "./shogiMessage.js";
import { sessionMessageSchema } from "./sessionMessage.js";


export const clientMessageSchema = z.union([
  shogiMessageSchema,
  sessionMessageSchema
]);
export type ClientMessage = z.infer<typeof clientMessageSchema>;
