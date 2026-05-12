## 2歩のバリデーション
```ts
const boardSize = boardConfig.boardSize;


export const ShogiRulesValidator = {
  violateDoublePawn: (board: Board, positionDropped: Position, side: Side): void => {
    let pawnsPosList: Position[] = [];

    for (let y = 0; y < boardSize; y++) {
      const square: ShogiPiece | undefined = board.squares[y]![positionDropped.x];

      // 持ち駒を打った側の 歩 のみカウントする
      const isCountablePawn = (
        square &&
        square!.kind === "Pawn" &&
        square!.side === side
      ) || (
        y === positionDropped.y
      );

      if (isCountablePawn) {
        pawnsPosList.push({ x: positionDropped.x, y });

        if (pawnsPosList.length > 1) {
          console.log(`2歩はこの座標で起こっています: ${pawnsPosList.map(pos => JSON.stringify(pos))}`);
          throw new ShogiRulesError("DOUBLE_PAWN");
        }
      };
    }
  }
}
```

## 既存のバリデーションと同じ粒度で設定できる

```diff ts
export const moveValidator = {
  ...

  canDrop: (board: Board, position: Position, piece: ShogiPiece) => {
    ...

    if (piece.kind === "Knight") {
      // 桂馬は相手陣地2段目以内に打てません（移動不能な駒となるため）
      const invalidYRange: [number, number] = piece.side === "Sente" ? [0, 1] : [8, 7];
      if (isInsideRange(position.y, invalidYRange)) {
        throw new MovementError("DROP_TO_INVALID_SQUARE");
      }
    }

    if (piece.kind === "Lance" || piece.kind === "Pawn") {
      // 前にしか動けない駒は、最下段に打てません（移動不能な駒となるため）
      const invalidY = piece.side === "Sente" ? 0 : 8;
      if (position.y === invalidY) {
        throw new MovementError("DROP_TO_INVALID_SQUARE");
      }
    }

+   if (piece.kind === "Pawn") {
+     ShogiRulesValidator.violateDoublePawn(board, position, piece.side);
+   }

    return true;
  },

  ...
}
```


## テスト
```sh
stdout | packages/core/entities/__test__/shogiRules.test.ts > 将棋のルール > 2歩を禁止する
2歩はこの座標で起こっています: {"x":5,"y":4},{"x":5,"y":6}
2歩はこの座標で起こっています: {"x":4,"y":1},{"x":4,"y":6}
2歩はこの座標で起こっています: {"x":0,"y":6},{"x":0,"y":7}

 ✓ packages/core/entities/__test__/shogiRules.test.ts (1 test) 7ms
   ✓ 将棋のルール (1)
     ✓ 2歩を禁止する 5ms
```

```ts
describe("将棋のルール", () => {
  it("2歩を禁止する", () => {
    const board = new Board(hirateSquares);

    const invalidPosList: Position[] = [
      { x: 5, y: 4 },
      { x: 4, y: 1 },
      { x: 0, y: 7 }
    ];

    invalidPosList.forEach(pos => {
      expect(
        () => board.dropPiece(pos, new ShogiPiece("Sente", "Pawn"))
      ).toThrow(ShogiRulesError);
    });
  });
});
```
