import { Game } from "../../entities/Game/Game.js";
import { Timer } from "../../entities/Timer/Timer.js";
import { handicapSchema, type Handicap } from "../../entities/types/handicap.types.js";
import { domainErrorHandler } from "../errors/domainErrorHandler.js";
import { ShogiController } from "./ShogiController.js";


type TimerConstructor = ConstructorParameters<typeof Timer>[0];


type Methods = Record<
  "hirate" | Handicap,
  (
    timerOptions: Omit<
      TimerConstructor,
      "currentSide"
    >
  ) => ShogiController>;
type HandicapMethods = Pick<Methods, Handicap>;

const handicapInitializers: HandicapMethods =
  handicapSchema.options.reduce((acc: HandicapMethods, handicap) => {
    acc[handicap] = (
      ...timerOptions: ConstructorParameters<typeof Timer>
    ) => {
      return domainErrorHandler(() => {
        return new ShogiController(
          Game.init[handicap](),
          new Timer(...timerOptions)
        )
      });
    }

    return acc;
  }, {} as HandicapMethods);



export const initializers: Methods = {
  hirate: (
    ...timerOptions
  ) => {
    return domainErrorHandler(() => {
      return new ShogiController(
        Game.init.hirate(),
        new Timer(...timerOptions)
      )
    });
  },

  ...handicapInitializers
}
