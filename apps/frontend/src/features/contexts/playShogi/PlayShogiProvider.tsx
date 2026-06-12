"use client";

import { type PlayShogiCtx, playShogiCtx } from "./playShogiContext";
import { playShogi } from "./shogiController/playShogi";
import { useShogiController } from "./shogiController/useShogiController";

export function PlayShogiProvider({ children }: { children: React.ReactNode }) {
  const value: PlayShogiCtx = {
    play: playShogi,
    useControllers: useShogiController
  };


  return (
    <playShogiCtx.Provider value={value}>
      {children}
    </playShogiCtx.Provider>
  )
}
