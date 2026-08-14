import { createContext, Dispatch, SetStateAction, useContext } from "react";

type ErrorName = "BAD_REQUEST" | "INTERNAL_ERROR" | null;

export type SystemErrorCtx = {
  errorName: ErrorName,
  setErrorName: Dispatch<SetStateAction<ErrorName>>
}


export const systemErrorCtx = createContext<SystemErrorCtx | null>(null);

export const useSystemError = () => {
  const ctx = useContext(systemErrorCtx);

  if (!ctx) throw new Error("useSystemError must be used within SystemErrorProvider.");
  return ctx;
}
