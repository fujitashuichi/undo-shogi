"use-client";

import { Side } from "@packages";
import React, { createContext, SetStateAction, useContext } from "react";

export interface GameStatus {
  winner: Side,
  giveUp: Side | null
}


type GameStatusCtx = {
  gameStatus: GameStatus,
  setGameStatus: React.Dispatch<SetStateAction<GameStatus>>
}

export const gameStatusCtx = createContext<GameStatusCtx | null>(null);

export const useGameStatus = () => {
  const ctx = useContext(gameStatusCtx);

  if (!ctx) throw new Error('useCounter must be used within a CounterProvider');
  return ctx;
}
