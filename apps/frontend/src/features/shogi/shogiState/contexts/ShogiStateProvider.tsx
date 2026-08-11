import React, { useMemo, useState } from 'react'
import { ShogiStateCtx, shogiStateCtx } from './shogiStateCtx';

export function ShogiStateProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [status, setStatus] = useState<ShogiStateCtx["status"]>(null);
  const [currentTime, setCurrentTime] = useState<ShogiStateCtx["currentTime"]>(null);
  const [currentBoard, setCurrentBoard] = useState<ShogiStateCtx["currentBoard"]>(null);

  const value = useMemo(() => ({
    status, setStatus,
    currentTime, setCurrentTime,
    currentBoard, setCurrentBoard
  }), [status, setStatus, currentTime, setCurrentTime, currentBoard, setCurrentBoard]);

  return (
    <shogiStateCtx.Provider value={value}>
      {children}
    </shogiStateCtx.Provider>
  )
}
