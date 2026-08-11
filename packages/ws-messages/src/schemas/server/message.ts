import { z } from "zod";
import { serverSessionMessageSchema } from "./sessionMessage.js";
import { serverShogiMessageSchema } from "./shogiMessage.js";
import { serverSystemMessageSchema } from "./systemMessage.js";


export const serverMessageSchema = z.union([
  serverShogiMessageSchema,
  serverSessionMessageSchema,
  serverSystemMessageSchema
]);
export type ServerMessage = z.infer<typeof serverMessageSchema>;
