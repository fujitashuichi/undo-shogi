"use client";

import { AppLoadingBar } from "@/components/AppLoadingBar";
import { GameView } from "@/features/components/GameView";
import { useGameStatus } from "@/features/contexts/gameStatus/gameStatusContext";
import { usePlayShogi } from "@/features/contexts/playShogi/playShogiContext";
import { useTimes } from "@/features/contexts/times/timesContext";
import { ShogiController } from "@packages";
import { useEffect, useState } from "react";

export default function Page() {
  const [controllerId, setControllerId] = useState<string>();
  const [controller, setController] = useState<ShogiController>();

  const { times, setTimes } = useTimes();
  const { gameStatus, setGameStatus } = useGameStatus();

  const { useControllers } = usePlayShogi();
  const { createNewController, removeController } = useControllers();


  useEffect(() => {
    const setUp = () => {
      const { id, controller } = createNewController("hirate", {
        remainingSeconds: {
          Sente: 10 * 60,
          Gote:  10 * 60
        },

        onTick: (side, remainingSeconds) => {
          setTimes(prev => {
            return { ...prev, [side]: remainingSeconds[side] };
          });
        },

        onTimeUp: (side) => {
          setGameStatus(prev => {
            return { ...prev, winner: side === "Sente" ? "Gote" : "Sente" }
          });
        }
      });

      setControllerId(id);
      setController(controller);
    };

    setUp();


    return () => {
      if (controllerId) removeController(controllerId);
    }
  }, []);


  if (!controllerId || !controller) return <AppLoadingBar />;

  return (
    <GameView controller={controller} times={times} gameStatus={gameStatus} />
  )
}