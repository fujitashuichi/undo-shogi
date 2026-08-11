"use client";

import React, { useMemo, useState } from "react";
import { GameStatusCtx, gameStatusCtx } from "./gameStatusContext";

export function GameStatusProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [gameStatus, setGameStatus] = useState<GameStatusCtx["gameStatus"]>({
    winner: "Sente",
    giveUp: null,
    onGame: true
  });

  const value = useMemo(() => ({
    gameStatus,
    setGameStatus
  }), [gameStatus, setGameStatus]);


  return (
    <gameStatusCtx.Provider value={value}>
      {children}
    </gameStatusCtx.Provider>
  )
}
