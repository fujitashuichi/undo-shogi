import { GameStatusCtx } from '../contexts/gameStatus/gameStatusContext';
import { usePlayer } from '../contexts/player/playerContext';
import { useTimes } from '../contexts/times/timesContext';
import { ShogiBoard } from './ShogiBoard';
import { ShogiController } from '@packages/shogi';
import { StartGameButton } from './StartGameButton';
import { StopGameButton } from './StopGameButton';


export function GameView({
  controller, gameStatus
}: {
  controller: ShogiController,
  gameStatus: GameStatusCtx["gameStatus"]
}) {
  const { player } = usePlayer();
  const { timeStrings } = useTimes();

  const currentBoard = controller.status.history.at(-1)!.board;

  return (
    <div>
      <div>
        <h1>{gameStatus.winner ? `${gameStatus.winner}の勝利` : null}</h1>
      </div>
      <div>
        <p>先手: {timeStrings.Sente}</p>
        <p>後手: {timeStrings.Gote}</p>
      </div>
      <div>
        <StartGameButton controller={controller} />
        <StopGameButton controller={controller} />
      </div>
      <ShogiBoard board={currentBoard} player={player} />
    </div>
  )
}
