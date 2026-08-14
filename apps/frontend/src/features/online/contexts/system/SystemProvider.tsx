import React from 'react'
import { SystemErrorProvider } from './contexts/ErrorProvider';

export function SystemProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SystemErrorProvider>
      {children}
    </SystemErrorProvider>
  )
}
