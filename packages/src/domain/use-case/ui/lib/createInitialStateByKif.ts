import { GameState } from "../../../entities/GameState/GameState.js";
import { getKifHeader } from "./getKifHeader.js";


const handicapMap: Record<string, () => GameState> = {
  飛車落ち() { return GameState.init.hishaOchi() },
  角落ち() { return GameState.init.kakuOchi() },
  香落ち() { return GameState.init.kyoOchi() },
  二枚落ち() { return GameState.init.two() },
  四枚落ち() { return GameState.init.four() },
  六枚落ち() { return GameState.init.six() },
  八枚落ち() { return GameState.init.eight() },
  十枚落ち() { return GameState.init.ten() }
}


export const createInitialStateByKif = (kif: string): GameState => {
  const kifHeader = getKifHeader(kif);
  const handicap = kifHeader["手合割"];

  if (!handicap || handicap === "平手") {
    return GameState.init.hirate();
  }

  if (handicap in handicapMap) {
    return handicapMap[handicap]!();
  }

  return GameState.init.hirate();
}
