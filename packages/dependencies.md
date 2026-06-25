```mermaid
flowchart TD

subgraph packages
  shogi
  tools
  ws-messages

  shogi & ws-messages --> tools
  ws-messages --> shogi
end
```
