"use client";

import { Handicap, NormalPieceKind, ShogiController, ShogiTimerOptions } from "@packages";
import { createContext, useContext } from "react";
import { Coordinate } from "./shogiController/types/position.type";


type Result = {
  success: false,
  message: string
} | {
  success: true,
  status: ShogiController["status"]
};


type Play = (controller: ShogiController) => {
  movePiece(
    current: Coordinate, next: Coordinate, promote: boolean
  ): Result,

  dropPiece(
    coordinate: Coordinate, piece: NormalPieceKind
  ): Result,

  undo():       Result,
  startMatch(): Result,
  stopMatch():  Result
}


type UseControllers = () => {
  controllers: Record<
    string,
    ShogiController | undefined
  >;

  createNewController(
    handicap: "hirate" | Handicap,
    options: ShogiTimerOptions
  ): {
    id: string, controller: ShogiController
  },

  createNewController_ByKif(
    options: ShogiTimerOptions,
    kif: string
  ): {
    id: string, controller: ShogiController
  },

  removeController(id: string): void
}


export type PlayShogiCtx = {
  play: Play,
  useControllers: UseControllers
}


export const playShogiCtx = createContext<PlayShogiCtx | null>(null);

export const usePlayShogi = () => {
  const ctx = useContext(playShogiCtx);

  if (!ctx) throw new Error('usePlayShogi must be used within a PlayShogiProvider');
  return ctx;
}
