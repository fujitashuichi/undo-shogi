"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";


type Status = "loading" | "opened" | "closed";

export type SocketStatusCtx = {
  status: Status,
  setStatus: Dispatch<SetStateAction<Status>>
}



export const socketStatusCtx = createContext<SocketStatusCtx | null>(null);

export const useSocketStatus = () => {
  const ctx = useContext(socketStatusCtx);

  if (!ctx) throw new Error("useSocketStatus must be used within a SocketStatusProvider");
  return ctx;
}
