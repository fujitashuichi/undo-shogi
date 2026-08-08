"use client";

import { useEffect, useRef } from "react";
import { setupWsEvents } from "./wsEvents";


const BE_URL = "ws://localhost:3000";

export function useWebSocket() {
  const socket = useRef<WebSocket | null>(null);

  const createNewConnection = () => {
    socket.current = new WebSocket(BE_URL);
    setupWsEvents(socket.current);
  }


  useEffect(() => {
    const connect = () => createNewConnection();
    connect();

    return () => {
      socket.current?.close();
      socket.current = null;
    }
  }, []);


  return { socket, createNewConnection }
}
