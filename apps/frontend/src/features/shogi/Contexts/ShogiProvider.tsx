"use client";

import React from "react";
import { ShogiErrorProvider } from "../errors/contexts/ShogiErrorProvider";
import { ShogiSessionProvider } from "../session/contexts/ShogiSessionProvider";
import { ShogiStateProvider } from "../shogiState/contexts/ShogiStateProvider";
import { SocketProvider } from "../ws/contexts/SocketProvider";


export function ShogiProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ShogiErrorProvider>
    <ShogiSessionProvider>
    <ShogiStateProvider>
      <SocketProvider>
        {children}
      </SocketProvider>
    </ShogiStateProvider>
    </ShogiSessionProvider>
    </ShogiErrorProvider>
  )
}
