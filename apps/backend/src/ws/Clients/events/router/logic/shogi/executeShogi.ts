import type { ClientShogiMessage } from "@packages/ws-messages";
import type { ShogiResult, ShogiRoom } from "../../../../../Groups/ShogiRoom";
import { toLogicPosition } from "./toLogicPosition";


export const executeShogi = (
  onResult: (result: ShogiResult) => void,
  shogiRoom: ShogiRoom,
  message: ClientShogiMessage
) => {
  const command = message.command;


  if (
    command === "startGame" ||
    command === "stopGame" ||
    command === "undo"
  ) {
    const result = shogiRoom[command]();
    return onResult(result);
  }


  if (command === "dropPiece") {
    const result = shogiRoom.dropPiece(
      toLogicPosition(message.body.to),
      message.body.kind
    );
    return onResult(result);
  }

  if (command === "movePiece") {
    const result = shogiRoom.movePiece(
      toLogicPosition(message.body.from),
      toLogicPosition(message.body.to),
      message.body.promote
    );
    return onResult(result);
  }
}
