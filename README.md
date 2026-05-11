# undo-shogi


## [開発ログ](./docs/diary/diary.md)


## 技術スタック

### FE: Next.js
Reactを深めたいこととNext.jsを学び始めたことが重なり、無条件でNext.jsを選定しました。

### BE: ASP.NET Core (EFCore)
Next.jsでBEも一緒に作れるのですが、以下の点が懸念されます。
* 動作が重くなる
* Next.js初心者にとって、BEまでまとめ上げるのはリスキー
* 慣れないAPIの書き方で、動作不能になる可能性がある

Next.js以外ではExpressかEFCoreが使えるので、どちらを選ぶかということになりました。

Expressはカスタマイズしやすく初速がいい印象ですが、今回はDI化を根本的に理解するという裏コンセプトがあるため、DIを標準とするEFCoreを選定しました。

### デプロイ: FE-Vercel / BE-Render
Vercelによるデプロイ手順をもう一度確認したいため、Vercelを選定しました。

ただ、サーバーレス関数においてWebSocketのホストができないため、BEはRenderなどの利用を考えています。BEのデプロイ先については変更の可能性があります。
