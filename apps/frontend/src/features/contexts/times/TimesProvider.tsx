"use client";

import React, { useState } from "react";
import { TimesCtx, timesCtx } from "./timesContext";

export function TimesProvider({ children }: { children: React.ReactNode }) {
  const [times, setTimes] = useState<TimesCtx["times"]>({
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
