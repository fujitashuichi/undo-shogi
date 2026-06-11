"use-client";

import { Side } from "@packages";
import React, { createContext, SetStateAction, useContext } from "react";

export interface Player {
  side: Side,
  remainingSeconds: number
}


type PlayerCtx = {
  player: Player,
  setPlayer: React.Dispatch<SetStateAction<Player>>
}

export const playerCtx = createContext<PlayerCtx | null>(null);

export const usePlayer = () => {
  const ctx = useContext(playerCtx);

  if (!ctx) throw new Error('useCounter must be used within a CounterProvider');
  return ctx;
}
