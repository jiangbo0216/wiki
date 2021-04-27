## alias 命令增加
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.hist "log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short"

## 配置文件
文件位置: 
* /etc/gitconfig
* ~/.gitconfig
* 位于git项目目录中的.git/config：适用于特定git项目的配置。
```
[alias]
  co = checkout
  ci = commit
  st = status
  br = branch
  hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
  type = cat-file -t
  dump = cat-file -p
```
## bash alias
可以在 ~/.bashrc 或者 ~/.zshrc 中设置 alias g=git 这样就可以使用 g checkout 来代替 git checkout 了。

## 多条命令/可配置参数
由于git别名本身不支持配置参数和多条命令，此处使用shell函数来完成这个功能。



由于git别名本身不支持配置参数和多条命令，此处使用shell函数来完成这个功能。

在别名的配置中，如果配置的命令以！开头，那么之后的命令都会被使用shell执行，因此，所有shell中可以执行的命令，都可以配置了！

比如，我常用的同步本地仓库和远端仓库(名为MP)一致的命令，一般写为：

```
$ git fetch MP & git rebase MP/master
```

我们可以在别名中使用函数完成：

```
[alias]

fr = "!f() { git fetch $1 & git rebase $1/master; }; f"
```

$1代表传入的第一个参数，$2代表第二个，之后以此类推。

之后，我们执行

```
$ git fr MP
```

就等同于执行之前的命令了。

更多内容可以参考：

[One weird trick for powerful Git aliases](https://www.atlassian.com/blog/git/advanced-git-aliases)

[Git alias with parameters](https://jondavidjohn.com/git-aliases-parameters/)