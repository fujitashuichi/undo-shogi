import { ShogiStatus } from "@packages/shogi";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

type Status = ShogiStatus | null;
type CurrentTime = ShogiStatus["remainingSeconds"] | null;
type CurrentBoard = ShogiStatus["history"][number] | null;

export type ShogiStatusCtx = {
  status: Status,             setStatus: Dispatch<SetStateAction<Status>>
  currentTime: CurrentTime,   setCurrentTime: Dispatch<SetStateAction<CurrentTime>>
  currentBoard: CurrentBoard, setCurrentBoard: Dispatch<SetStateAction<CurrentBoard>>
}


export const shogiStatusCtx = createContext<ShogiStatusCtx | null>(null);

export const useShogiStatus = () => {
  const ctx = useContext(shogiStatusCtx);

  if (!ctx) throw new Error("useShogiState must be used within ShogiStateProvider.");
  return ctx;
}
