import { z } from "zod";
import { serverSessionMessageSchema } from "./sessionMessage.js";
import { serverShogiMessageSchema } from "./shogiMessage.js";
import { errorNameSchema } from "./errorName.js";


export const serverMessageSchema = z.union([
  serverShogiMessageSchema,
  serverSessionMessageSchema,
  z.object({
    type: z.literal("none"),
    success: false,
    errorName: errorNameSchema
  })
]);
export type ServerMessage = z.infer<typeof serverMessageSchema>;
