"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { socketCtx } from "./socket";
import { useSocketStatus } from "./socketStatus";
import { setupWsEvents } from "../lib/wsEvents";


const BE_URL = "ws://localhost:3000";

export function SocketProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { setStatus, setLastMessage } = useSocketStatus();

  const socket = useRef<WebSocket | null>(null);

  const createNewConnection = useCallback(() => {
    socket.current = new WebSocket(BE_URL);
    setupWsEvents(socket.current, setStatus, setLastMessage);
  }, [setStatus, setLastMessage]);


  useEffect(() => {
    const connect = () => createNewConnection();
    connect();

    const currentSocket = socket.current;
    return () => {
      currentSocket?.close();
      socket.current = null;
    }
  }, [createNewConnection]);


  const value = useMemo(() => ({
    socket, createNewConnection
  }), [socket, createNewConnection]);


  return (
    <socketCtx.Provider value={value}>
      {children}
    </socketCtx.Provider>
  )
}
