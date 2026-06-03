import { GameState } from "../../../entities/GameState/GameState.js";
import { getKifHeader } from "./getKifHeader.js";


const handicapMap: Record<string, GameState> = {
  飛車落ち: GameState.init.hishaOchi(),
  角落ち: GameState.init.kakuOchi(),
  香落ち: GameState.init.kyoOchi(),
  二枚落ち: GameState.init.two(),
  四枚落ち: GameState.init.four(),
  六枚落ち: GameState.init.six(),
  八枚落ち: GameState.init.eight(),
  十枚落ち: GameState.init.ten()
}


export const createInitialStateByKif = (kif: string): GameState => {
  const kifHeader = getKifHeader(kif);
  const handicap = kifHeader["手合割"];

  if (!handicap || handicap === "平手") {
    return GameState.init.hirate();
  }

  if (Object.keys(handicapMap).includes(handicap)) {
    return handicapMap[handicap]!;
  }

  return GameState.init.hirate();
}
