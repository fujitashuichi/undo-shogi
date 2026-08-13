import React, { useMemo, useState } from 'react'
import { ShogiStatusCtx, shogiStatusCtx } from './StatusCtx';

export function ShogiStatusProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [status, setStatus] = useState<ShogiStatusCtx["status"]>(null);
  const [currentTime, setCurrentTime] = useState<ShogiStatusCtx["currentTime"]>(null);
  const [currentBoard, setCurrentBoard] = useState<ShogiStatusCtx["currentBoard"]>(null);

  const value = useMemo(() => ({
    status, setStatus,
    currentTime, setCurrentTime,
    currentBoard, setCurrentBoard
  }), [status, setStatus, currentTime, setCurrentTime, currentBoard, setCurrentBoard]);

  return (
    <shogiStatusCtx.Provider value={value}>
      {children}
    </shogiStatusCtx.Provider>
  )
}
