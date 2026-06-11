"use-client";

import React, { useState } from "react";
import { Player, playerCtx } from "./playerContext";

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<Player>({
    side: "Sente",
    remainingSeconds: 10 * 60
  });

  const value = {
    player,
    setPlayer
  }


  return (
    <playerCtx.Provider value={value}>
      {children}
    </playerCtx.Provider>
  )
}
