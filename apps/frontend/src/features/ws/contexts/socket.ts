"use client";

import { createContext, RefObject, useContext } from "react";

type Socket = RefObject<WebSocket | null>;
type CreateNewConnection = () => void;

type SocketCtx = {
  socket: Socket,
  createNewConnection: CreateNewConnection
}

export const socketCtx = createContext<SocketCtx | null>(null);

export const useSocket = () => {
  const ctx = useContext(socketCtx);

  if (!ctx) throw new Error("useGameStatus must be used within a GameStatusProvider");
  return ctx;
}
