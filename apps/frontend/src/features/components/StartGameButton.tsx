"use client";

import { AppButton } from '@/components/AppButton';
import { useGameStatus } from '../contexts/gameStatus/gameStatusContext';
import { ShogiController } from '@packages';
import { useStartMatch } from './hooks/useStartMatch';


export function StartGameButton({ controller }: { controller: ShogiController }) {
  const { gameStatus } = useGameStatus();
  const { startMatch } = useStartMatch(controller);


  return (
    <AppButton
      variant="primary"
      onClick={startMatch}
      className={`${gameStatus.onGame ? "disabled:bg-gray-600" : ""}`}
    >
      対局開始
    </AppButton>
  )
}
