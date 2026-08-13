"use client";

import { createContext, useContext } from "react";

type CreateNewConnection = () => void;

type SocketCtx = {
  createNewConnection: CreateNewConnection
}

export const socketCtx = createContext<SocketCtx | null>(null);

export const useSocket = () => {
  const ctx = useContext(socketCtx);

  if (!ctx) throw new Error("useGameStatus must be used within a GameStatusProvider");
  return ctx;
}
