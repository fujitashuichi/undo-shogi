import React from 'react'
import { ShogiStatusProvider } from './contexts/StatusProvider';
import { ShogiErrorProvider } from './contexts/ErrorProvider';

export function GameStatusProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ShogiErrorProvider>
      <ShogiStatusProvider>
        {children}
      </ShogiStatusProvider>
    </ShogiErrorProvider>
  )
}
