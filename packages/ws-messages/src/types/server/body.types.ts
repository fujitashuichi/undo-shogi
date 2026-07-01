import { z } from "zod";

const clientInfoSchema = z.object({
  clientId: z.uuid(),
  groupId: z.uuid().or(z.literal("unGrouped"))
});


const onConnectionSchema = clientInfoSchema;

const movePieceSchema = z.object({
  status:
});
