## 型定義
駒に対して、以下の3つのコンストラクタを定義する

```ts
constructor(
  public readonly side: Side,
  public readonly kind: PieceKind,
  public readonly isPromoted: boolean = false
) {}
```
