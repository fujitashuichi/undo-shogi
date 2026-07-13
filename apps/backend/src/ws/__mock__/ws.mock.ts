import { vi } from 'vitest';
import { WebSocket } from "ws";


export const mockWs = (): WebSocket => {
  return {
    readyState: 1,

    send: vi.fn((data: string) => {}),
    close: vi.fn(),

    onmessage: null as ((event: any) => void) | null,
    onopen: null as (() => void) | null,
    onclose: null as (() => void) | null,
    onerror: null as ((err: any) => void) | null,
  } as unknown as WebSocket;
};
