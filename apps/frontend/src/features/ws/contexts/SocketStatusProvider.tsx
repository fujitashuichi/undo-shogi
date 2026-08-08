import React, { useMemo, useState } from "react";
import { SocketStatusCtx, socketStatusCtx } from "./socketStatus";

export function SocketStatusProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [status, setStatus] = useState<SocketStatusCtx["status"]>("closed");
  const [lastMessage, setLastMessage] = useState<SocketStatusCtx["lastMessage"]>(null);

  const value = useMemo(() => ({
    status, setStatus,
    lastMessage, setLastMessage
  }), [status, setStatus, lastMessage, setLastMessage]);

  return (
    <socketStatusCtx.Provider value={value}>
      {children}
    </socketStatusCtx.Provider>
  )
}
