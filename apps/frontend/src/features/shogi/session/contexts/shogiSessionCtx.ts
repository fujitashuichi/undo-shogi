import { createContext, Dispatch, SetStateAction, useContext } from "react";

type Status = "idle" | "loading" | "matched";
type Session = {
  clientId: string | null,
  groupId: string | null
};

export type ShogiSessionCtx = {
  status: Status,
  setStatus: Dispatch<SetStateAction<Status>>,
  session: Session,
  setSession: Dispatch<SetStateAction<Session>>
};


export const sessionCtx = createContext<ShogiSessionCtx | null>(null);

export const useShogiSession = () => {
  const ctx = useContext(sessionCtx);

  if (!ctx) throw new Error("useSession must be used within SessionProvider.");
  return ctx;
}
