"use client";

import React, { useState } from "react";
import { TimesCtx, timesCtx } from "./timesContext";

export function TimesProvider({ children }: { children: React.ReactNode }) {
  const [timeStrings, setTimeStrings] = useState<TimesCtx["timeStrings"]>({
    Sente: "--:--",
    Gote: "--:--"
  });

  const value = {
    timeStrings,
    setTimeStrings
  };


  return (
    <timesCtx.Provider value={value}>
      {children}
    </timesCtx.Provider>
  )
}
