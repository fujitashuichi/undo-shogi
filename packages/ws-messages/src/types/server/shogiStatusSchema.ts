import { normalPieceKindSchema, pieceKindSchema, ShogiController } from "@shogi";
import { z } from "zod";

const status: ShogiController["status"];


const sideSchema = z.enum(["Sente", "Gote"]);

const remainingSecondsSchema = z.object({

})

const gameEndStatusSchema = z.union([
  z.object({
    ended: z.literal(false)
  }),
  z.object({
    ended: true,
    winner: sideSchema
  })
]);

const boardSchema = z.array(z.array(
  z.object({
    side: sideSchema,
    pieceKind: pieceKindSchema
  })
));

const handsSchema = z.record(normalPieceKindSchema, z.number());


const shogiStatusSchema = z.object({
  gameEndStatus: gameEndStatusSchema,
  remainingSeconds: ,
  board: boardSchema,
  hands: handsSchema,
  currentSide: sideSchema
}) satisfies ShogiController["status"]
