import { ShogiController, type Handicap, type ShogiTimerOptions } from "@packages";
import type { UUID } from "crypto";
import { WebSocket } from "ws";


type Props = {
  gameId: UUID,
  handicap: "hirate" | Handicap,
  timerOptions: ShogiTimerOptions,
  ws: WebSocket
}


export class ShogiClient {
  public readonly gameId;
  public readonly ws;
  public readonly controller;

  constructor({
    gameId,
    handicap,
    timerOptions,
    ws
  }: Props) {
    this.gameId = gameId;
    this.ws = ws;
    this.controller = ShogiController.init[handicap](timerOptions);
  }
}
