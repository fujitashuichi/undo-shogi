"use client";

import { Side } from "@packages";
import React, { createContext, SetStateAction, useContext } from "react";

type Player = {
  side: Side,
  remainingSeconds: number
}


export type PlayerCtx = {
  player: Player,
  setPlayer: React.Dispatch<SetStateAction<Player>>
}

export const playerCtx = createContext<PlayerCtx | null>(null);

export const usePlayer = () => {
  const ctx = useContext(playerCtx);

  if (!ctx) throw new Error('usePlayer must be used within a PlayerProvider');
  return ctx;
}
