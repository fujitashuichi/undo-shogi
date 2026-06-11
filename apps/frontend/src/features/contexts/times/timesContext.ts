"use-client";

import { Side } from "@packages";
import React, { createContext, SetStateAction, useContext } from "react";

export interface Times {
  sente: string,
  gote: string
}


type TimesCtx = {
  times: Times,
  setTimes: React.Dispatch<SetStateAction<Times>>
}

export const timesCtx = createContext<TimesCtx | null>(null);

export const useTimes = () => {
  const ctx = useContext(timesCtx);

  if (!ctx) throw new Error('useCounter must be used within a CounterProvider');
  return ctx;
}
