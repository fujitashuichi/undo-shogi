"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { socketCtx } from "./socketCtx";
import { setupWsEvents } from "@/features/shogi/ws/lib/wsEvents";
import { useShogi } from "../../shogiCtx";


const BE_URL = "ws://localhost:3000";

export function SocketProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const shogiCtx = useShogi();

  const socket = useRef<WebSocket | null>(null);

  const createNewConnection = useCallback(() => {
    socket.current = new WebSocket(BE_URL);
    setupWsEvents(socket.current, shogiCtx);
  }, [shogiCtx]);


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
    createNewConnection
  }), [createNewConnection]);


  return (
    <socketCtx.Provider value={value}>
      {children}
    </socketCtx.Provider>
  )
}
