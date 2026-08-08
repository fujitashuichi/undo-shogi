"use client";

import { ServerMessage } from "@packages/ws-messages";
import { createContext, Dispatch, SetStateAction, useContext } from "react";


type Status = "loading" | "opened" | "closed";
type LastMessage = ServerMessage | null;

export type SocketStatusCtx = {
  status: Status,
  setStatus: Dispatch<SetStateAction<Status>>,
  lastMessage: LastMessage,
  setLastMessage: Dispatch<SetStateAction<LastMessage>>
}



export const socketStatusCtx = createContext<SocketStatusCtx | null>(null);

export const useSocketStatus = () => {
  const ctx = useContext(socketStatusCtx);

  if (!ctx) throw new Error("useSocketStatus must be used within a SocketStatusProvider");
  return ctx;
}
