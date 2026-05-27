```mermaid
flowchart TD
  KIF -->|"kif-formatter"| Actions["MoveAction[]"]
  Actions -->|"kif-commands"| States["GameState[]"]
  States -->|"kif-commands"| Hash["hash"]
```
