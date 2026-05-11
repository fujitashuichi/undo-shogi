## 型定義
駒に対して、以下のコンストラクタを定義する

```ts
constructor(
  public readonly side: Side,
  public readonly kind: PieceKind,
  public readonly isPromoted: boolean = false
  public readonly id: UUID = crypto.randomUUID()
) {
  pieceValidator(isPromoted, kind);
}
```


## インスタンス不変性

* zenn: https://zenn.dev/fujishu/articles/70ae4198a4d7f5

インスタンスを作り直すことでバグの温床を減らしている。
人間的に同じ駒に当たるもの（歩とそれが成ったと金など）は同じIDを割り当てる方針にしている。

複数の状態の駒においてIDが重複していることは、棋譜でカバーする。
過去の駒インスタンスはガベージコレクションに任せる。
