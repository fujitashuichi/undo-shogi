"use client";

import { useCallback, useState } from "react";
import { Handicap, ShogiController, ShogiTimerOptions } from "@packages";


type Controllers = Record<
  string,
  ShogiController
>;


export const useShogiController = () => {
  const [controllers, setControllers] = useState<Controllers>({});


  const createNewController = useCallback((
      handicap: "hirate" | Handicap,
      options: ShogiTimerOptions
    ) => {
      const id = crypto.randomUUID();
      const controller = ShogiController.init[handicap](options);

      setControllers(
        prev => ({
          ...prev,
          [id]: controller
        })
      );

      return { id, controller };
    },
    []
  );

  const createNewController_ByKif = useCallback((
      options: ShogiTimerOptions,
      kif: string
    ) => {
      const id = crypto.randomUUID();
      const controller = ShogiController.init.byKif(options, kif);

      setControllers(
        prev => ({
          ...prev,
          [id]: controller
        })
      );

      return { id, controller };
    },
    []
  )


  const removeController = useCallback((id: string) => {
      setControllers(prev => {
        if (!(id in prev)) {
          return prev;
        }

        prev[id].stop();

        const copy = { ...prev };
        delete copy [id];

        return copy;
      })
    },
    []
  );


  return {
    controllers,
    createNewController,
    createNewController_ByKif,
    removeController
  }
}
