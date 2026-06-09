"use client";

import { useState } from "react";
import { Handicap, ShogiController, ShogiTimerOptions } from "@packages";


type Controllers = Record<
  string,
  ShogiController
>;


export const useShogiController = () => {
  const [controllers, setControllers] = useState<Controllers>({});


  const createNewController = (
    handicap: "hirate" | Handicap,
    options: ShogiTimerOptions
  ) => {
    const id = crypto.randomUUID();
    const controller = ShogiController.init[handicap](options);

    setControllers({
      ...controllers,
      [id]: controller
    });

    return { id, controller };
  }


  const removeController = (id: string) => {
    if (id in controllers) {
      controllers[id].stop();

      const copy = { ...controllers };
      delete copy [id];

      return setControllers(copy);
    }
  }


  return {
    createNewController,
    removeController
  }
}
