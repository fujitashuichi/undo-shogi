import React, { useMemo, useState } from 'react'
import { SystemErrorCtx, systemErrorCtx } from './errorCtx';

export function SystemErrorProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [errorName, setErrorName] = useState<SystemErrorCtx["errorName"]>(null);

  const value = useMemo(() => ({
    errorName, setErrorName
  }), [errorName, setErrorName]);

  return (
    <systemErrorCtx.Provider value={value}>
      {children}
    </systemErrorCtx.Provider>
  )
}
