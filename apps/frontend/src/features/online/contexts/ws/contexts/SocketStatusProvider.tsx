import React, { useMemo, useState } from "react";
import { SocketStatusCtx, socketStatusCtx } from "./socketStatus";

export function SocketStatusProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [status, setStatus] = useState<SocketStatusCtx["status"]>("closed");

  const value = useMemo(() => ({
    status, setStatus
  }), [status, setStatus]);

  return (
    <socketStatusCtx.Provider value={value}>
      {children}
    </socketStatusCtx.Provider>
  )
}
