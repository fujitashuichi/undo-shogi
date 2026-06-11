"use-client";

import React, { useState } from "react";
import { Times, timesCtx } from "./timesContext";

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [times, setTimes] = useState<Times>({
    sente: "10:00",
    gote: "10:00"
  });

  const value = {
    times,
    setTimes
  }


  return (
    <timesCtx.Provider value={value}>
      {children}
    </timesCtx.Provider>
  )
}
