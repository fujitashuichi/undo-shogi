"use client";

import React, { useState } from "react";
import { GameStatusCtx, gameStatusCtx } from "./gameStatusContext";

export function GameStatusProvider({ children }: { children: React.ReactNode }) {
  const [gameStatus, setGameStatus] = useState<GameStatusCtx["gameStatus"]>({
    winner: "Sente",
    giveUp: null,
    onGame: true
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
