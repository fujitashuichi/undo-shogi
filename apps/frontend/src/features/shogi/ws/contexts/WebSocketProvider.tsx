import React from "react";
import { SocketStatusProvider } from "./SocketStatusProvider";
import { SocketProvider } from "./SocketProvider";

export function WebSocketProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SocketStatusProvider>
      <SocketProvider>
        {children}
      </SocketProvider>
    </SocketStatusProvider>
  )
}
