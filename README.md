# 翻牌遊戲
```
使用express做前後端分離的架構，後端簡易API設計，透過typescript編寫。
```
<img src='https://github.com/ZheAnZheng/flip_card_game/blob/master/public/image/game_screen.png'/>


## 環境建置與需求

- node v17.1.0
- express 4.17.1
- path 0.12.7
- tpyescript  4.5.2

開發工具
- gulp
- gulp-typescript

----
## 安裝
1. 複製到資料夾
```
git clone https://github.com/ZheAnZheng/flip_card_game
```
2. 進入資料夾
```
cd flip_card_game
```
3. node_modules安裝
```
npm install
```
4. 開啟伺服器
```
npm run start
```

Feature
----

1. 點擊卡片，會顯示正面並且發亮顯示
2. 點擊第二張後，會進行配對
3. 失敗後，蓋上卡片。
4. 成功後，繼續顯示卡片，並以淺灰色表示配對成功。
5. score超過260遊戲結束

