# WebSocketMessageによる通信規格について

## commandについて

`message`は`command`を持ち、この`command`が意思疎通に最も寄与します。

## command実装（2026/07/17時点）
`command.schemas.ts`の実装に、以下の定義があります。

```ts
export const shogiCommandSchema = z.enum(["movePiece", "dropPiece", "undo", "startMatch", "stopMatch"]);
export const sessionCommandSchema = z.enum(["onConnection", "matching"]);

export const commandSchema = z.union([
  shogiCommandSchema,
  sessionCommandSchema
]);
export type Command = z.infer<typeof commandSchema>;
```

まとめると、以下のようなコマンドが存在します。

|||
|---|---|
| shogi | ・movePiece <br/> ・dropPiece <br/> ・undo <br/> ・startMatch <br/> ・stopMatch |
| session | ・onConnection <br/> ・matching |

### commandの役割

WebSocketは自由度が高いため、どんな方法で疎通するか決める必要があります。

ここでは、単に何の用途で会話したいか示せばいいので、`command`という名前で簡易的に識別します。

サーバー側・クライアント側それぞれに、`command`に応じたmessage構造を強制しています。

```ts
// サーバー側の例
// ServerMessage型のみ受け入れます。

client.send({
  success: true,
  command: "matching",
  value: {
    clientId: client.clientId,
    groupId: result.groupId
  }
})
```
