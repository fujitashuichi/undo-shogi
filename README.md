# undo-shogi


## 技術スタック

### FE: Next.js
Reactを深めたいこととNext.jsを学び始めたことが重なり、無条件でNext.jsを選定しました。

### BE: Express
Next.jsでBEも一緒に作れるのですが、以下の点が懸念されます。
* Next.js初心者にとって、BEまでまとめ上げるのはリスキー
* 慣れないAPIの書き方で、動作不能になる可能性がある

Next.js以外ではExpressかEFCoreが使えるので、どちらを選ぶかということになりました。

当初はEFCoreを考えていましたが、TSがインポートできないことを考えExpressに変更しました。
