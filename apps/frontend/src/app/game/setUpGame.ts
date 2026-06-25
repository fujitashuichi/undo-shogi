"use client";

import { useGameStatus } from "@/features/contexts/gameStatus/gameStatusContext";
import { usePlayShogi } from "@/features/contexts/playShogi/playShogiContext";
import { useTimes } from "@/features/contexts/times/timesContext";
import { ShogiController } from "@packages/shogi";
import { useState } from "react";


export const useSetupGame = () => {
  const [controllerId, setControllerId] = useState<string>();
  const [controller, setController] = useState<ShogiController>();


  const { useControllers } = usePlayShogi();
  const { createNewController } = useControllers();

  const { setTimeStrings } = useTimes();

  const { setGameStatus } = useGameStatus();


  const setUp = () => {
    const { id, controller } = createNewController("hirate", {
      remainingSeconds: {
        Sente: 10 * 60,
        Gote:  10 * 60
      },

      onTick: (side, remainingSeconds) => {
        const time = remainingSeconds[side];

        setTimeStrings(prev => {
          return {
            ...prev,
            [side]: `${Math.floor(time / 60)}:${time % 60}`
          };
        });
      },

      onTimeUp: (side) => {
        setGameStatus(prev => {
          return {
            ...prev,
            winner: side === "Sente" ? "Gote" : "Sente"
          }
        });
      }
    });


    setTimeStrings({
      Sente: "10:00", Gote: "10:00"
    });

    setGameStatus({
      winner: null,
      giveUp: null,
      onGame: false
    });


    setControllerId(id);
    setController(controller);
  };


  return {
    controller,
    controllerId,
    setUp
  }
};
