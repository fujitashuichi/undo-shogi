"use client";

import { AppLoadingBar } from "@/components/AppLoadingBar";
import { GameView } from "@/features/local/components/GameView";
import { useGameStatus } from "@/features/local/contexts/gameStatus/gameStatusContext";
import { usePlayShogi } from "@/features/local/contexts/playShogi/playShogiContext";
import { useEffect } from "react";
import { useSetupGame } from "./setUpGame";


export default function Page() {
  const { gameStatus } = useGameStatus();

  const { useControllers } = usePlayShogi();
  const { removeController } = useControllers();

  const { setUp, controller, controllerId } = useSetupGame();


  useEffect(() => {
    setUp();

    return () => {
      if (controllerId) {
        removeController(controllerId);
      }
    }
  }, []);


  if (!controllerId || !controller) return <AppLoadingBar />;

  return (
    <GameView controller={controller} gameStatus={gameStatus} />
  )
}