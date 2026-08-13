"use client";

import React from "react";
import { ShogiStatusProvider } from "./shogiStatus/contexts/StatusProvider";
import { SessionProvider } from "./session/SessionProvider";
import { WebSocketProvider } from "./ws/WebSocketProvider";


export function ShogiProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ShogiStatusProvider>
      <SessionProvider>
        <WebSocketProvider>
          {children}
        </WebSocketProvider>
      </SessionProvider>
    </ShogiStatusProvider>
  )
}
