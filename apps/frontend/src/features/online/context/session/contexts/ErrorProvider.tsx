import React, { useMemo, useState } from "react";
import { SessionErrorCtx, sessionErrorCtx } from "./ErrorCtx";

export function SessionErrorProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [errorName, setErrorName] = useState<SessionErrorCtx["errorName"]>(null);

  const value = useMemo(() => ({
    errorName, setErrorName
  }), [errorName, setErrorName]);

  return (
    <sessionErrorCtx.Provider value={value}>
      {children}
    </sessionErrorCtx.Provider>
  )
}
