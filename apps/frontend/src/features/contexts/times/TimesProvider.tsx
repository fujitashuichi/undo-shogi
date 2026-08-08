"use client";

import React, { useMemo, useState } from "react";
import { TimesCtx, timesCtx } from "./timesContext";

export function TimesProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [timeStrings, setTimeStrings] = useState<TimesCtx["timeStrings"]>({
    Sente: "--:--",
    Gote: "--:--"
  });

  const value = useMemo(() => ({
    timeStrings,
    setTimeStrings
  }), [timeStrings, setTimeStrings]);


  return (
    <timesCtx.Provider value={value}>
      {children}
    </timesCtx.Provider>
  )
}
