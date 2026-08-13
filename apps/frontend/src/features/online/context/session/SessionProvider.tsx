import React from 'react'
import { SessionErrorProvider } from './contexts/ErrorProvider';
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
