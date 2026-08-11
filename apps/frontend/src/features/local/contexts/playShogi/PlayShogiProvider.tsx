"use client";

import { useMemo } from "react";
import { type PlayShogiCtx, playShogiCtx } from "./playShogiContext";
import { playShogi } from "./shogiController/playShogi";
import { useShogiController } from "./shogiController/useShogiController";

export function PlayShogiProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const value: PlayShogiCtx = useMemo(() => ({
    play: playShogi,
    useControllers: useShogiController
  }), []);


  return (
    <playShogiCtx.Provider value={value}>
      {children}
    </playShogiCtx.Provider>
  )
}
