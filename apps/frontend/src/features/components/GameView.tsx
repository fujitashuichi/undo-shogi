import { AppLoadingBar } from '@/components/AppLoadingBar';
import { GameStatusCtx } from '../contexts/gameStatus/gameStatusContext';
import { usePlayer } from '../contexts/player/playerContext';
import { PlayShogiCtx, usePlayShogi } from '../contexts/playShogi/playShogiContext';
import { TimesCtx } from '../contexts/times/timesContext';
import { ShogiBoard } from './ShogiBoard';
import { ShogiController } from '@packages';


export function GameView({
  controller, times, gameStatus
}: {
  controller: ShogiController,
  times: TimesCtx["times"],
  gameStatus: GameStatusCtx["gameStatus"]
}) {
  const { player } = usePlayer();

  if (!controller) {
    console.warn("controller undefined.")
    return <AppLoadingBar />
  };

  const currentBoard = controller.status.history.at(-1)!.board;

  return (
    <div>
      <div>
        <h1>{gameStatus.winner ?? null}</h1>
      </div>
      <div>
        <p>先手: {times.sente}</p>
        <p>後手: {times.gote}</p>
      </div>
      <ShogiBoard board={currentBoard} player={player} />
    </div>
  )
}
