import { logger } from "@packages/tools";
import { NormalPieceKind, ShogiController, DomainError } from "@packages/shogi";
import { Coordinate } from "./types/position.type";
import { coordinateToPosition } from "./lib/convertPosition";
import { PlayShogiCtx } from "../playShogiContext";


type Result = {
  success: false,
  message: string
} | {
  success: true,
  status: ShogiController["status"]
};


const errorHandler = (func: () => ShogiController): Result => {
  try {
    const controller = func();

    return {
      success: true,
      status: structuredClone(controller.status)
    };
  } catch (err) {
    if (err instanceof DomainError) {
      return {
        success: false,
        message: err.message
      }
    }

    logger.fatal(err);

    return {
      success: false,
      message: "予期せぬエラーが発生しました。"
    }
  }
}


export const playShogi: PlayShogiCtx["play"] = (controller) => {
  const movePiece = (
    current: Coordinate,
    next: Coordinate,
    promote: boolean
  ): Result => {
    return errorHandler(() => {
      controller.movePiece(
        coordinateToPosition(current),
        coordinateToPosition(next),
        promote
      );

      return controller;
    });
  }


  const dropPiece = (
    coordinate: Coordinate,
    piece: NormalPieceKind
  ): Result => {
    return errorHandler(() => {
      controller.dropPiece(
        coordinateToPosition(coordinate),
        piece
      );

      return controller;
    });
  }

  const undo = () => {
    return errorHandler(() => {
      controller.undo();

      return controller;
    });
  }


  const startMatch = () => {
    return errorHandler(() => {
      controller.start();

      return controller;
    });
  }

  const stopMatch = () => {
    return errorHandler(() => {
      controller.stop();

      return controller;
    });
  }


  return {
    movePiece,
    dropPiece,
    undo,
    startMatch,
    stopMatch
  }
}
