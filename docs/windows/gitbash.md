## 设置alias

对于全局安装 git bash 启动时会执行文件 C:\Program Files\Git\etc\bash.bashrc

先 vim ~/.bash_profile

```
alias dev='npm run dev'
alias g='git'
alias gsu='git stash -u'
alias gl='git pull'
alias gp='git push'
```

可以在文件尾部增加

source ~/.bash_profile

重启之后即可生效或者命令行执行 source ~/.bash_profile 立即生效

另外也可以直接修改 Program Files/Git/etc/profile.d/aliases.sh 这个文件, 注意使用管理员权限保存
