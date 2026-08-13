import React from "react";
import { SocketStatusProvider } from "./contexts/SocketStatusProvider";
import { SocketProvider } from "./contexts/SocketProvider";


export function WebSocketProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SocketStatusProvider>
      <SocketProvider>
        {children}
      </SocketProvider>
    </SocketStatusProvider>
  )
}
