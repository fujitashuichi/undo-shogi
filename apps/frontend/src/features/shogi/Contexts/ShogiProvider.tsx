"use client";

import React from "react";
import { ShogiErrorProvider } from "../errors/contexts/ShogiErrorProvider";
import { ShogiSessionProvider } from "../session/contexts/ShogiSessionProvider";
import { ShogiStateProvider } from "../shogiState/contexts/ShogiStateProvider";
import { WebSocketProvider } from "../ws/contexts/WebSocketProvider";


export function ShogiProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ShogiErrorProvider>
    <ShogiSessionProvider>
    <ShogiStateProvider>
      <WebSocketProvider>
        {children}
      </WebSocketProvider>
    </ShogiStateProvider>
    </ShogiSessionProvider>
    </ShogiErrorProvider>
  )
}
