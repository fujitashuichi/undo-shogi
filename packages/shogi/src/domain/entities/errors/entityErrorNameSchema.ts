import { z } from "zod";
import { gameErrorNameSchema } from "./gameError.js";
import { kifErrorNameSchema } from "./kifError.js";
import { logicErrorNameSchema } from "./logicError.js";
import { movementErrorNameSchema } from "./movementErrors.js";
import { pieceErrorNameSchema } from "./pieceError.js";
import { timerErrorNameSchema } from "./timerError.js";
import { rulesErrorNameSchema } from "./rulesError.js";


export const entityErrorNameSchema = z.enum([
  ...gameErrorNameSchema.options,
  ...kifErrorNameSchema.options,
  ...logicErrorNameSchema.options,
  ...movementErrorNameSchema.options,
  ...pieceErrorNameSchema.options,
  ...rulesErrorNameSchema.options,
  ...timerErrorNameSchema.options
]);
