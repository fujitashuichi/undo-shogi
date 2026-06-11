"use client";

import React, { useState } from "react";
import { GameStatus, gameStatusCtx } from "./gameStatusContext";

export function GameStatusProvider({ children }: { children: React.ReactNode }) {
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    winner: "Sente",
    giveUp: null
  });

  const value = {
    gameStatus,
    setGameStatus
  }


  return (
    <gameStatusCtx.Provider value={value}>
      {children}
    </gameStatusCtx.Provider>
  )
}
