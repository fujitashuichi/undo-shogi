## マッチング処理のフローについて

### 1. successパターン

`success response`が返ってきたら、そこでマッチング処理は終了する。

```mermaid
sequenceDiagram

actor client
participant logic
participant tryMatch
participant queue@{ "type": "queue" }

client()->>logic: command "matching"

Note over logic: 1. enqueue()
logic->>queue: enqueue(client)
queue-->>()client: enqueue

Note over logic: 2. tryMatch()
logic->>tryMatch: execute

Note over tryMatch: success
tryMatch-->>logic: return T

Note over logic: 3. dequeue
logic->>queue: dequeue(client)
queue-->>()client: dequeue

logic-->>()client: success response
```

### 2. failureパターン

failureの際に`dequeue(client)`すると、キューに一瞬しか存在しないことになりマッチングが成立しにくい。
そのため、明示的にキャンセルしない限りキューに残す。

再度コマンドを送って、自発的にマッチングする。

```mermaid
sequenceDiagram

actor client
participant logic
participant tryMatch
participant queue@{ "type": "queue" }

Note right of client: 再試行可能
loop
  client()->>logic: command "matching"

  Note over logic: 1. enqueue()
  logic->>queue: enqueue(client)
  queue-->>()client: enqueue

  Note over logic: 2. tryMatch()
  logic->>tryMatch: execute

  Note over tryMatch: success
  tryMatch-->>logic: return U
  logic-->>()client: failure response
end
```

### 3. 打ち切りパターン

打ち切りたいときには明示的にキューから削除しなければならない。
そのため、`stopMatching`コマンドで明示的に打ち切る。

```mermaid
sequenceDiagram

actor client
participant logic
participant tryMatch
participant queue@{ "type": "queue" }

client()->>logic: command "matching"

Note over client,queue: 1. enqueue()
logic->>queue: enqueue(client)
queue-->>()client: enqueue


client()->>logic: command "stopMatching"

Note over client,queue: 2. dequeue()
logic->>queue: dequeue(client)
queue-->>()client: dequeue
```
