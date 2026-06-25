import { ShogiController } from '@packages/shogi';
import { PlayerCtx } from '../contexts/player/playerContext';


export function ShogiBoard({
  board, player
}: {
  board: ShogiController["status"]["history"][number]["board"],
  player: PlayerCtx["player"]
}) {
  return (
    <div>
      {
        board.map((rank, y_idx) =>
          rank.map((square, x_idx) => {
            let piece;

            if (!square) {
              piece = <div></div>;
            } else {
              if (square.side === player.side) {
                piece = <div>{square.piece}</div>;
              } else {
                piece = <div className="rotate-180">{square.piece}</div>
              }
            }

            return (<div key={`${y_idx}_${x_idx}`}>{piece}</div>)
          })
        )
      }
    </div>
  )
}
