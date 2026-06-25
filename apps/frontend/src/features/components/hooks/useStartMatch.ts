import { useGameStatus } from "@/features/contexts/gameStatus/gameStatusContext";
import { usePlayShogi } from "@/features/contexts/playShogi/playShogiContext";
import { ShogiController } from "@packages/shogi";

export const useStartMatch = (controller: ShogiController) => {
  const { setGameStatus, gameStatus } = useGameStatus();
  const { play } = usePlayShogi();


  const startMatch = () => {
    if (gameStatus.onGame) return;

    const result = play(controller).startMatch();

    if (!result.success) {
      return alert(result.message);
    }

    setGameStatus(prev => {
      return {
        ...prev,
        onGame: true
      }
    })
  }

  return { startMatch };
}
