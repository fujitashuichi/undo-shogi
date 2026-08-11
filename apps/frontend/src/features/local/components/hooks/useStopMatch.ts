import { useGameStatus } from "@/features/local/contexts/gameStatus/gameStatusContext";
import { usePlayShogi } from "@/features/local/contexts/playShogi/playShogiContext";
import { ShogiController } from "@packages/shogi";

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
