#!/bin/bash
data=$(curl -s -H "Accept: application/vnd.github.v3+json" https://api.github.com/users/$1)
for query in name bio location blog
do
	echo "$data" | grep \"$query\" | cut -d '"' -f 4
done

# -s : silent mode, 過濾 curl 顯示的額外資訊
# 把 curl 拿到的資料存在 variable，方便之後取用。此時要用 $() 把 curl 的整行程式碼包起來，才能存到 variable 裡
# 猜測是因為 JSON 格式的關係（？），要用 "" 把資料包起來才能用 grep 等的指令來處理
# 用 \ 跳脫字元後面跟著 "，只 match "name"、"bio"、"location"、"blog"，不再 match 別的怪東西