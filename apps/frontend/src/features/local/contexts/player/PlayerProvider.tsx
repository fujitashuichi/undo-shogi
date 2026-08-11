"use client";

import React, { useMemo, useState } from "react";
import { PlayerCtx, playerCtx } from "./playerContext";

export function PlayerProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [player, setPlayer] = useState<PlayerCtx["player"]>({
    side: "Sente",
    remainingSeconds: 10 * 60
  });

  const value = useMemo(() => ({
    player,
    setPlayer
  }), [player, setPlayer]);


  return (
    <playerCtx.Provider value={value}>
      {children}
    </playerCtx.Provider>
  )
}
