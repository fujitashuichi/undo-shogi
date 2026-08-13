import React from 'react'
import { SessionErrorProvider } from './contexts/SessionErrorProvider';
import { ShogiSessionProvider } from './contexts/SessionProvider';

export function SessionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionErrorProvider>
      <ShogiSessionProvider>
        {children}
      </ShogiSessionProvider>
    </SessionErrorProvider>
  )
}
