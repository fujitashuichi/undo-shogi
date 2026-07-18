import { vi } from "vitest";
import type { Client } from "../Client";
import { mockWs } from "../../__mock__/ws.mock";

export const mockClient = (): Client => {
  return {
    clientId: crypto.randomUUID(),
    ws: mockWs(),
    send: vi.fn()
  }
}
