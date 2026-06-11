import { ShogiBoard } from './ShogiBoard';
import { usePlayer } from '../contexts/player/playerContext';
import { GameStatus } from '../contexts/gameStatus/gameStatusContext';
import { Times } from '../contexts/times/timesContext';
import { useShogiController } from '../contexts/playShogi/shogiController/useShogiController';
import { usePlayShogi } from '../contexts/playShogi/playShogiContext';


export function GameView({
  controllerId, times, gameStatus
}: {
  controllerId: string,
  times: Times,
  gameStatus: GameStatus
}) {
  const { useControllers } = usePlayShogi();
  const { controllers } = useControllers();
  const { player } = usePlayer();

  console.log(controllers[controllerId]);
  const currentBoard = controllers[controllerId].status.history.at(-1)!.board;

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
