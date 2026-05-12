## PieceKindをSSoTにした方が明確なため、成り駒をフラグではなく型で定義するように変更した

```ts
// 成っていない駒
export const NormalPieceKindSchema = z.enum([
  "King", "Gold", "Silver", "Knight", "Lance",
  "Bishop", "Rook",
  "Pawn"
]);
export type NormalPieceKind = z.infer<typeof NormalPieceKindSchema>;



// 成れる駒・成れない駒の区別
export const NoPromotablePieceKindSchema = NormalPieceKindSchema.extract([
  "King", "Gold"
]);
export type NoPromotablePieceKind = z.infer<typeof NoPromotablePieceKindSchema>;

export const PromotablePieceKindSchema = NormalPieceKindSchema.exclude([
  "King", "Gold"
]);
export type PromotablePieceKind = z.infer<typeof PromotablePieceKindSchema>;


// 成った駒
export const PromotedPieceKindSchema = z.enum([
  "P_Silver", "P_Knight", "P_Lance",
  "P_Bishop", "P_Rook",
  "P_Pawn"
]);
export type PromotedPieceKind = z.infer<typeof PromotedPieceKindSchema>;


// 駒全種
export const PieceKindSchema = NormalPieceKindSchema.or(PromotedPieceKindSchema);
export type PieceKind = z.infer<typeof PieceKindSchema>;
```


## pieceMotionを汎用的に定義した

```ts
const vectors: PieceVectors = [
  {
    dx: 0,
    dy: 1,
    infinity: true
  },
  {
    dx: 1,
    dy: 0,
    infinity: true
  },
  {
    dx: 0,
    dy: -1,
    infinity: true
  },
  {
    dx: -1,
    dy: 0,
    infinity: true
  }
];


export const rookMotion: PieceMotion = {
  vectors
}
```

```ts
const vectors: PieceVectors = [
  {
    dx: 0,
    dy: 1,
    infinity: true
  },
  {
    dx: 1,
    dy: 0,
    infinity: true
  },
  {
    dx: 0,
    dy: -1,
    infinity: true
  },
  {
    dx: -1,
    dy: 0,
    infinity: true
  },

  {
    dx: 1,
    dy: 1,
    infinity: false
  },
  {
    dx: 1,
    dy: -1,
    infinity: false
  },
  {
    dx: -1,
    dy: -1,
    infinity: false
  },
  {
    dx: -1,
    dy: 1,
    infinity: false
  }
];


export const p_RookMotion: PieceMotion = {
  vectors
}
```


## infinityフラグによってベクトルのバリデーションが少し書きやすくなる

### 移動ベクトルの確認のみ行う
```ts
const assertMotionVector = (piece: ShogiPiece, current: Position, next: Position): void => {
  const vectors = piece.motion.vectors;
  const direction = piece.side === "Sente" ? -1 : 1;

  const isValid = vectors.some(vector => {
    const dx = vector.dx;
    const dy = vector.dy * direction;

    let x = current.x + dx;
    let y = current.y + dy;

    if (vector.infinity) {
      while (positionValidator.isInBoard(x, y)) {
        if (next.x === x && next.y === y) return true;
        x += dx;
        y += dy;
      }
    } else {
      if (next.x === x && next.y === y) return true;
    }
    return false;
  });

  if (!isValid) throw new PieceError("INVALID_MOTION_VECTOR");
}
```


### 駒追い越しの規制だけ行う
```ts
const violatesLeapRestriction = (board: Board, piece: ShogiPiece, current: Position, next: Position): void => {
  const vectors = piece.motion.vectors;
  const direction = piece.side === "Sente" ? -1 : 1;

  for (const vector of vectors) {
    const dx = vector.dx;
    const dy = vector.dy * direction;

    let x = current.x + dx;
    let y = current.y + dy;
    let collided = false;

    if (vector.infinity) {
      while (positionValidator.isInBoard(x, y)) {
        // 目的の地点についたときに、過去に他の駒と衝突しているということは追い越しが行われている。
        if (next.x === x && next.y === y) {
          if (collided) throw new PieceError("LEAP_RESTRICTION");
          return;
        }

        if (board.squares[y]![x]) {
          collided = true;
        }

        x += dx;
        y += dy;
      }
    };
  };
}
```

### まとめて一つのバリデーションにする
```ts
export const pieceMotionValidator = (board: Board, piece: ShogiPiece, current: Position, next: Position) => {
  assertMotionVector(piece, current, next);
  violatesLeapRestriction(board, piece, current, next);
}
```

### 既存のバリデーションに統合
```ts
export const moveValidator = {
  canMove: (board: Board, piece: ShogiPiece, current: Position, next: Position) => {
    positionValidator.assertInBoard(current.x, current.y);
    positionValidator.assertInBoard(next.x, next.y);

    pieceMotionValidator(board, piece, current, next);
    ...
  }
  ...
}
```


ここまでで、駒単体の動きに関するバリデーションが揃った。
残っているのは、「2歩」「千日手」「先手・後手」などの制約であり、これは一回り外側で定義していくことになる。

駒の動作ルールなどは実質的に意識したくないものであり、上記の3つのルールのようなゲーム性に直結するルールを定義する際に意識しなくて済むことが多層的なバリデーションの狙いである。
