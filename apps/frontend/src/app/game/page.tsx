"use-client";

import { AppLoadingBar } from "@/components/AppLoadingBar";
import { useShogiController } from "@/features";
import { GameView } from "@/features/components/GameView";
import { useGameStatus } from "@/features/contexts/gameStatus/gameStatusContext";
import { useTimes } from "@/features/contexts/times/timesContext";
import { useEffect, useState } from "react";

export default function Page() {
  const [controllerId, setControllerId] = useState<string>();

  const { times, setTimes } = useTimes();
  const { gameStatus, setGameStatus } = useGameStatus()


  const { createNewController, removeController } = useShogiController();


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
    };

    setUp();


    return () => {
      if (controllerId) removeController(controllerId);
    }
  }, []);


  if (!controllerId) return <AppLoadingBar />;

  return (
    <GameView controllerId={controllerId} times={times} gameStatus={gameStatus} />
  )
}