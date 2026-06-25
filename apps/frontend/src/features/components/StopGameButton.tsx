"use client";

import { AppButton } from '@/components/AppButton';
import { useGameStatus } from '../contexts/gameStatus/gameStatusContext';
import { ShogiController } from '@packages/shogi';
import { useStopMatch } from './hooks/useStopMatch';


export function StopGameButton({ controller }: { controller: ShogiController }) {
  const { gameStatus } = useGameStatus();
  const { stopMatch } = useStopMatch(controller);


  return (
    <AppButton
      variant="primary"
      onClick={stopMatch}
      className={`${!gameStatus.onGame ? "disabled:bg-gray-600" : ""}`}
    >
      対局中断
    </AppButton>
  )
}
