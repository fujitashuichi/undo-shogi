"use client";

import { useSocketStatus } from "../../contexts/ws/contexts/socketStatus";


export function SocketStatusView() {
  const { status } = useSocketStatus();

  return (
    <p>{status}</p>
  )
}
