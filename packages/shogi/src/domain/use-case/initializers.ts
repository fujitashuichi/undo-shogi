import { type Prettify } from "@packages/tools";

import { Game } from "../entities/Game/Game.js";
import { Timer } from "../entities/Timer/Timer.js";
import { shogiErrorHandler } from "./errors/shogiErrorHandler.js";
import { ShogiController } from "./ShogiController.js";
import { handicapSchema, type Handicap } from "@/schemas/primitive/handicap.js";


// initメソッドは先手開始が必須であるため、
// "currentSide" の指定を拒否する
type TimerOptions = Prettify<
  Omit<
    ConstructorParameters<typeof Timer>[0],
    "currentSide"
  >
>;


type Methods = Record<
  "hirate" | Handicap,
  (timerOptions: TimerOptions) => ShogiController
> & Record<
  "byKif",
  (timerOptions: TimerOptions, kif: string) => ShogiController
>;

type HandicapMethods = Pick<Methods, Handicap>;


const handicapInitializers: HandicapMethods =
  handicapSchema.options.reduce((acc: HandicapMethods, handicap) => {
    acc[handicap] = (
      timerOptions: TimerOptions
    ) => {
      return shogiErrorHandler(() => {
        return new ShogiController(
          Game.init[handicap](),
          new Timer(timerOptions)
        )
      });
    }

    return acc;
  }, {} as HandicapMethods);



export const initializers: Methods = {
  hirate: (
    timerOptions
  ) => {
    return shogiErrorHandler(() => {
      return new ShogiController(
        Game.init.hirate(),
        new Timer(timerOptions)
      )
    });
  },

  ...handicapInitializers,

  byKif: (timerOptions, kif) => {
    return shogiErrorHandler(() => {
      return new ShogiController(
        Game.init.byKif(kif),
        new Timer(timerOptions)
      )
    });
  }
}
