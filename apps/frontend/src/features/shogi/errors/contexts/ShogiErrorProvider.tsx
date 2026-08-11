"use client";

import React, { useMemo, useState } from "react";
import { ShogiErrorCtx, shogiErrorCtx } from "./shogiError";

export function ShogiErrorProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [errorName, setErrorName] = useState<ShogiErrorCtx["errorName"]>(null);

  const value = useMemo(() => ({
    errorName, setErrorName
  }), [errorName, setErrorName]);

  return (
    <shogiErrorCtx.Provider value={value}>
      {children}
    </shogiErrorCtx.Provider>
  )
}
