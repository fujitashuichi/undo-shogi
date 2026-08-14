"use client";

import React from "react";
import { SessionProvider } from "./session/SessionProvider";
import { WebSocketProvider } from "./ws/WebSocketProvider";
import { GameStatusProvider } from "./gameStatus/GameStatusProvider";
import { SystemProvider } from "./system/SystemProvider";


export function OnlineShogiProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <GameStatusProvider>
      <SessionProvider>
        <SystemProvider>
          <WebSocketProvider>
            {children}
          </WebSocketProvider>
        </SystemProvider>
      </SessionProvider>
    </GameStatusProvider>
  )
}
