import type { Side } from "@/schemas/primitive/players.js";
import type { Position } from "@/schemas/primitive/algebraic.js";
import { Board } from "../Board/Board.js";
import { Hands } from "../Hands/Hands.js";
import { isChecked } from "./validators/checkmate/isChecked.js";
import { isCheckMated } from "./validators/checkmate/isCheckMated.js";
import { handicapInitializers } from "./handicapInitializers.js";
import { MovementError } from "../errors/movementErrors.js";
import { positionValidator } from "./validators/positionValidator.js";
import { gameState_movePiece } from "./movePiece/movePiece.js";
import type { NormalPieceKind } from "@/schemas/primitive/piece.js";
import { gameState_dropPiece } from "./dropPiece/dropPiece.js";
import { ShogiPieceNormal } from "../Piece/Piece.js";


export class GameState {
  public readonly board: Board;
  public readonly hands: Hands;
  public readonly currentSide: Side;
  public readonly checked: Side | null = null;
  public readonly checkMated: Side | null = null;

  constructor(
    board: Board,
    hands: Hands,
    currentSide: Side = "Sente"
  ) {
    this.board = board;
    this.hands = hands;
    this.currentSide = currentSide;

    this.checked = isChecked(board, currentSide) ? currentSide : null;
    this.checkMated = isCheckMated(board, hands, currentSide) ? currentSide : null;
  }


  public static init = {
    hirate: () => {
      return new GameState(
        Board.init.hirate(),
        Hands.init.empty()
      )
    },

    ...handicapInitializers
  }


  public readonly movePiece = (current: Position, next: Position, promote: boolean): GameState => {
    if (this.checkMated === this.currentSide) throw new MovementError("CHECK_MATED")

    positionValidator.assertInBoard(current.x, current.y);
    positionValidator.assertInBoard(next.x, next.y);

    const targetPiece = this.board.squares[current.y]![current.x];
    if (!targetPiece) throw new MovementError("MOVE_UNDEFINED_PIECE");

    if (targetPiece.side !== this.currentSide) throw new MovementError("MOVE_OPPONENT_SIDES_PIECE");

    return gameState_movePiece(this, current, next, promote);
  }


  public readonly dropPiece = (position: Position, kind: NormalPieceKind): GameState => {
    if (this.checkMated === this.currentSide) throw new MovementError("CHECK_MATED");
    positionValidator.assertInBoard(position.x, position.y);

    return gameState_dropPiece(this, position, new ShogiPieceNormal(this.currentSide, kind));
  }
}
