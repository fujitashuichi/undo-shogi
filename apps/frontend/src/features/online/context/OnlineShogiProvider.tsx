"use client";

import React from "react";
import { SessionProvider } from "./session/SessionProvider";
import { WebSocketProvider } from "./ws/WebSocketProvider";
import { GameStatusProvider } from "./gameStatus/GameStatusProvider";


export function OnlineShogiProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <GameStatusProvider>
      <SessionProvider>
        <WebSocketProvider>
          {children}
        </WebSocketProvider>
      </SessionProvider>
    </GameStatusProvider>
  )
}
