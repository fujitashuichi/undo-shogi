"use client";

import { Side } from "@packages/shogi";
import React, { createContext, SetStateAction, useContext } from "react";

type GameStatus = {
  winner: Side | null,
  giveUp: Side | null,
  onGame: boolean
}


export type GameStatusCtx = {
  gameStatus: GameStatus,
  setGameStatus: React.Dispatch<SetStateAction<GameStatus>>
}

export const gameStatusCtx = createContext<GameStatusCtx | null>(null);

export const useGameStatus = () => {
  const ctx = useContext(gameStatusCtx);

  if (!ctx) throw new Error('useGameStatus must be used within a GameStatusProvider');
  return ctx;
}
