"use client";

import { useSocketStatus } from "../../context/ws/contexts/socketStatus";


export function SocketStatusView() {
  const { status } = useSocketStatus();

  return (
    <p>{status}</p>
  )
}
