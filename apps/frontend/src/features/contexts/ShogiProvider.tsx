import React from "react";
import { PlayerProvider } from "./player/PlayerProvider";
import { TimesProvider } from "./times/TimesProvider";
import { GameStatusProvider } from "./gameStatus/GameStatusProvider";
import { PlayShogiProvider } from "./playShogi/PlayShogiProvider";

export function ShogiProvider({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <TimesProvider>
        <GameStatusProvider>
          <PlayShogiProvider>
            {children}
          </PlayShogiProvider>
        </GameStatusProvider>
      </TimesProvider>
    </PlayerProvider>
  )
}