import { z } from "zod";
import { commandSchema } from "../command.types.js";
import { bodySchema } from "./body.types.js";


const headerSchema = z.object({
  command: commandSchema
});


export const clientMessageSchema = z.object({
  header: headerSchema,
  body: bodySchema
});
export type ClientMessage = z.infer<typeof clientMessageSchema>;
