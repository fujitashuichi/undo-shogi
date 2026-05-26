import { z } from "zod";
export type Side = "Sente" | "Gote";
export declare const NormalPieceKindSchema: z.ZodEnum<{
    King: "King";
    Gold: "Gold";
    Silver: "Silver";
    Knight: "Knight";
    Lance: "Lance";
    Bishop: "Bishop";
    Rook: "Rook";
    Pawn: "Pawn";
}>;
export type NormalPieceKind = z.infer<typeof NormalPieceKindSchema>;
export declare const NoPromotablePieceKindSchema: z.ZodEnum<{
    King: "King";
    Gold: "Gold";
}>;
export type NoPromotablePieceKind = z.infer<typeof NoPromotablePieceKindSchema>;
export declare const PromotablePieceKindSchema: z.ZodEnum<{
    Silver: "Silver";
    Knight: "Knight";
    Lance: "Lance";
    Bishop: "Bishop";
    Rook: "Rook";
    Pawn: "Pawn";
}>;
export type PromotablePieceKind = z.infer<typeof PromotablePieceKindSchema>;
export declare const PromotedPieceKindSchema: z.ZodEnum<{
    P_Silver: "P_Silver";
    P_Knight: "P_Knight";
    P_Lance: "P_Lance";
    P_Bishop: "P_Bishop";
    P_Rook: "P_Rook";
    P_Pawn: "P_Pawn";
}>;
export type PromotedPieceKind = z.infer<typeof PromotedPieceKindSchema>;
export declare const PieceKindSchema: z.ZodUnion<[z.ZodEnum<{
    King: "King";
    Gold: "Gold";
    Silver: "Silver";
    Knight: "Knight";
    Lance: "Lance";
    Bishop: "Bishop";
    Rook: "Rook";
    Pawn: "Pawn";
}>, z.ZodEnum<{
    P_Silver: "P_Silver";
    P_Knight: "P_Knight";
    P_Lance: "P_Lance";
    P_Bishop: "P_Bishop";
    P_Rook: "P_Rook";
    P_Pawn: "P_Pawn";
}>]>;
export type PieceKind = z.infer<typeof PieceKindSchema>;
//# sourceMappingURL=piece.types.d.ts.map