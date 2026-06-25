"use client";

import { Side } from "@packages/shogi";
import React, { createContext, SetStateAction, useContext } from "react";

type TimeStrings = Record<Side, string>;


export type TimesCtx = {
  timeStrings: TimeStrings,
  setTimeStrings: React.Dispatch<SetStateAction<TimeStrings>>
}

export const timesCtx = createContext<TimesCtx | null>(null);

export const useTimes = () => {
  const ctx = useContext(timesCtx);

  if (!ctx) throw new Error('useTimes must be used within a TimesProvider');
  return ctx;
}
