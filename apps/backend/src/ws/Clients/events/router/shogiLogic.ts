import type { ClientShogiMessage } from "@packages/ws-messages";
import type { WssRegistry } from "../../../WssRegistry/WssRegistry";
import type { Client } from "../../Client";
import { executeShogi } from "./logic/shogi/executeShogi";


export const shogiLogic = (
  client: Client,
  wssRegistry: WssRegistry,
  message: ClientShogiMessage
) => {
  const notifyInternalError = () => client.send({
    type: "shogi",
    success: false,
    command: message.command,
    errorName: "INTERNAL_ERROR"
  });


  const group = wssRegistry.groups.findByClient(client);
  if (!group) return notifyInternalError();

  const shogiRoom = group.shogiRoom;
  if (!shogiRoom) return notifyInternalError();


  executeShogi(
    (result) => {
      if (!result.success) {
      }
    },
    shogiRoom,
    message
  );
}
