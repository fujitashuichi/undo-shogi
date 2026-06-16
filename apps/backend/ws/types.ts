import type { UUID } from "crypto";
import { WebSocket } from "ws";

export type Connections = Record<UUID, WebSocket>;
