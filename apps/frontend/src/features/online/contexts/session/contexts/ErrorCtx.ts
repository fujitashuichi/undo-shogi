import { createContext, Dispatch, SetStateAction, useContext } from "react";


type SessionErrorName =
  | "BAD_REQUEST" | "INTERNAL_ERROR"
  | "FAILED_TO_MATCHING" | "INVALID_RESPONSE"
  | null;

export type SessionErrorCtx = {
  errorName: SessionErrorName,
  setErrorName: Dispatch<SetStateAction<SessionErrorName>>
};


export const sessionErrorCtx = createContext<SessionErrorCtx | null>(null);

export const useSessionError = () => {
  const ctx = useContext(sessionErrorCtx);

  if (!ctx) throw new Error("useSessionError must be used within sessionErrorProvider.");
  return ctx;
}
