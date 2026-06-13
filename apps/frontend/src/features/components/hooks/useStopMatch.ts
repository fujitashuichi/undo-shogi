import { useGameStatus } from "@/features/contexts/gameStatus/gameStatusContext";
import { usePlayShogi } from "@/features/contexts/playShogi/playShogiContext";
import { ShogiController } from "@packages";

export const useStopMatch = (controller: ShogiController) => {
  const { setGameStatus, gameStatus } = useGameStatus();
  const { play } = usePlayShogi();

  const stopMatch = () => {
    if (!gameStatus.onGame) return;

    const result = play(controller).stopMatch();

    if (!result.success) {
      return alert(result.message);
    }

    setGameStatus(prev => {
      return {
        ...prev,
        onGame: false
      }
    })
  }

  return { stopMatch };
}
