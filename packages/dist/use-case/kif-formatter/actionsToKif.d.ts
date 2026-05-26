/**
 * GameStateに流し込んだ着手オブジェクトの配列から、KIF形式の棋譜テキストを出力します。
 * 移動前の駒種が必要なため、シミュレーション時の情報を一部付与して渡す構造を想定しています。
 */
import type { MoveAction } from "./types.js";
export declare const actionsToKif: (moves: MoveAction[]) => string;
//# sourceMappingURL=actionsToKif.d.ts.map