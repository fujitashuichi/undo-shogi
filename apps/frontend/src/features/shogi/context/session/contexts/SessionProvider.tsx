"use client";

import { useMemo, useState } from "react";
import { ShogiSessionCtx, sessionCtx } from "./sessionCtx";

export function ShogiSessionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [status, setStatus] = useState<ShogiSessionCtx["status"]>("idle");
  const [session, setSession] = useState<ShogiSessionCtx["session"]>({
    clientId: null, groupId: null
  });

  const value = useMemo(() => ({
    status, setStatus,
    session, setSession
  }), [status, setStatus, session, setSession]);


  return (
    <sessionCtx.Provider value={value}>
      {children}
    </sessionCtx.Provider>
  )
}
