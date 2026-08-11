import { ShogiError } from "@packages/shogi";
import { createContext, Dispatch, SetStateAction, useContext } from "react";


type ErrorName = ShogiError["errorName"] | null;

export type ShogiErrorCtx = {
  errorName: ErrorName,
  setErrorName: Dispatch<SetStateAction<ErrorName>>
};


export const shogiErrorCtx = createContext<ShogiErrorCtx | null>(null);

export const useShogiError = () => {
  const ctx = useContext(shogiErrorCtx);

  if (!ctx) throw new Error("useShogiError must be used within ShogiErrorProvider.");
  return ctx;
}
