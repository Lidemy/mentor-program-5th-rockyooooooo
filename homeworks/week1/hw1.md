## 交作業流程

1. `git branch week1` - 開一個新的 branch
2. `git checkout week1` - 切換到 week1 branch
3. 完成作業
4. `git add .` - 將所有新增或修改過的檔案加入暫存區
5. `git commit -m 'finish week1'` - commit 暫存區裡的檔案
6. `git push origin week1` - 把 week1 push 到 GitHub 上
7. 在 GitHub 上發送 Pull Request
8. 複製 Pull Request 的網址，到學習系統上繳交作業
9. 等到作業改完 merge 之後，`git checkout master` - 切換到 master branch
10. `git pull origin master` - 把 GitHub 上的 master branch pull 下來
11. `git branch -d week1` - 把 merge 完成的 branch 刪除
