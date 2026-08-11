import { ShogiStatus } from "@packages/shogi";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

type Status = ShogiStatus | null;
type CurrentTime = ShogiStatus["remainingSeconds"] | null;
type CurrentBoard = ShogiStatus["history"][number] | null;

export type ShogiStateCtx = {
  status: Status,             setStatus: Dispatch<SetStateAction<Status>>
  currentTime: CurrentTime,   setCurrentTime: Dispatch<SetStateAction<CurrentTime>>
  currentBoard: CurrentBoard, setCurrentBoard: Dispatch<SetStateAction<CurrentBoard>>
}


export const shogiStateCtx = createContext<ShogiStateCtx | null>(null);

export const useShogiState = () => {
  const ctx = useContext(shogiStateCtx);

  if (!ctx) throw new Error("useShogiState must be used within ShogiStateProvider.");
  return ctx;
}
