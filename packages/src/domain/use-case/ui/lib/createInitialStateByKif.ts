import { GameState } from "../../../entities/GameState/GameState.js";
import { KifError } from "../../../service/kif-formatter/errors/kif.error.js";

function getKifHeader(kifContent: string): Record<string, string> {
  const headers: Record<string, string> = {};

  const lines = kifContent.replace(/\r\n/g, '\n').split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === '' || /^\d+\s/.test(trimmedLine)) {
      break;
    }

    const separatorIndex = trimmedLine.search(/[:：]/);
    if (separatorIndex !== -1) {
      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine.slice(separatorIndex + 1).trim();
      headers[key] = value;
    }
  }

  return headers;
}


export const createInitialStateByKif = (kif: string): GameState => {
  const kifHeader = getKifHeader(kif);

  console.log(kifHeader);

  const handicap = kifHeader["手合割"];

  if (!handicap || handicap === "平手") {
    return GameState.init.hirate();
  }

  // 3. 各種「駒落ち」の判定分岐（段階的に実装を拡張できる設計）
  switch (handicap) {
    case "香落ち":
      // return GameState.init.kyoOchi();
      break;

    case "角落ち":
      // return GameState.init.kakuOchi();
      break;

    case "飛車落ち":
      // return GameState.init.hishaOchi();
      break;

    case "二枚落ち":
      // return GameState.init.nimaiOchi();
      break;

    case "その他":
      // 任意配置のパース処理をここに挟む
      break;

    default:
      throw new KifError("UNSUPPORTED_KIF");
  }

  return GameState.init.hirate();
}
