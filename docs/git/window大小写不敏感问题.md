# [解决 Git 重命名时遇到的大小写不敏感的问题](https://blog.walterlv.com/post/case-insensitive-in-git-rename.html#%E4%BD%BF%E7%94%A8-windows-10-%E5%9B%9B%E6%9C%88%E6%9B%B4%E6%96%B0%E7%9A%84%E7%89%B9%E6%80%A7%E6%8E%A8%E8%8D%90)

Windows/Mac OS 操作系统文件的大小写是不敏感的，不管文件路径是何种奇怪的大小写，我们始终可以以另一种大小写的方式访问到这个路径种的文件或者文件夹。Linux 操作系统文件的大小写却是敏感的，不同大小写意味着不同的路径。于是，Windows 下的 A 文件在 Docs 文件夹下，B 文件在 docs 文件夹下，最终效果是 A B 都在 docs 文件夹下；而同样的情况放到 Linux 中，A B 就在两个不同的文件夹。

Git 是大小写不敏感的，导致跨操作系统共享的 Git 仓库就会遇到上面的情况。如果重命名的文件或文件夹只有大小写不同，那么对 Git 来说甚至都没有变化。阅读本文将解决 Git 大小写不敏感导致的重命名无效的问题。

------

**更新：**Windows 10 1803 更新已经可以支持区分大小写的文件夹了，于是此问题迎刃而解，后面会详细说明。



##### 本文内容

- [解决方法（推荐）](https://blog.walterlv.com/post/case-insensitive-in-git-rename.html#解决方法推荐)
- [让人困扰的大小写问题](https://blog.walterlv.com/post/case-insensitive-in-git-rename.html#让人困扰的大小写问题)
- 走的弯路
  - [尝试方法二：core.ignorecase false](https://blog.walterlv.com/post/case-insensitive-in-git-rename.html#尝试方法二coreignorecase-false)
  - [尝试方法一：mv](https://blog.walterlv.com/post/case-insensitive-in-git-rename.html#尝试方法一mv)
- [尝试出的可行的方法](https://blog.walterlv.com/post/case-insensitive-in-git-rename.html#尝试出的可行的方法)
- [使用 Windows 10 四月更新的特性（推荐）](https://blog.walterlv.com/post/case-insensitive-in-git-rename.html#使用-windows-10-四月更新的特性推荐)



## 解决方法（推荐）



1. 更新 Windows 10 1803 并安装 Windows 的 Linux 子系统；
2. 开启文件夹的大小写敏感特性，请参见：
3. 使用以下命令改名，可以仅大小写不同，你可能需要加上 `-f`，这样即使目标文件名存在，也可以完成改名。

```
$ git mv -f ./Docs ./docs
$ git commit -m "改名"
```

在 git 中使用 `mv` 命令的时候，会自动 `add` 所以是不用额外在敲 `git add .` 的，而后面的 `commit` 之后就形成了一个提交，之后你该怎么处理你的 git 仓库就怎么处理你的 git 仓库。

注意，即便你已经开启了文件夹大小写敏感，但你依然需要使用 `git mv -f` 命令来重命名，如果使用 Windows 资源管理器来进行重命名，那么 git 也是无法识别到这种仅有大小写名称改变的重命名的。

------

我是分割线

------

如果你不了解到底是怎样的 git 重命名问题，那么可以阅读本博客的原始版本，还是踩了不少坑的。

## 让人困扰的大小写问题



让我对此问题产生困扰的是下面这张图，`Docs` 和 `docs` 两个文件夹分开了：

![img](window%E5%A4%A7%E5%B0%8F%E5%86%99%E4%B8%8D%E6%95%8F%E6%84%9F%E9%97%AE%E9%A2%98-imgs/2017-11-23-15-42-24.png)
▲ 分离的两个文件夹

`Docs` 改名为 `docs`，于是只有新增的文件才在 `docs` 文件夹下，旧文件依然在 `Docs` 中。`README.md` 中的链接可就遭殃了，还要注意大小写！

![img](window%E5%A4%A7%E5%B0%8F%E5%86%99%E4%B8%8D%E6%95%8F%E6%84%9F%E9%97%AE%E9%A2%98-imgs/2017-11-23-16-10-51.png)
▲ 稍不注意，就 404 了

## 走的弯路



这种问题怎么看都不像是我一个人会遇到的问题，堆栈网上讨论肯定很多。至少截至本文发表时，[How do I commit case-sensitive only filename changes in Git?](https://stackoverflow.com/questions/17683458/how-do-i-commit-case-sensitive-only-filename-changes-in-git) 中问题已经得到了 600+ 个赞，回答累计得到 1400+ 个赞了……

里面探讨的方法归结起来两个：

- `git mv -f OldFileNameCase newfilenamecase`
- `git config core.ignorecase false`

### 尝试方法二：core.ignorecase false

第二种方法看起来更简单，于是我第一时间在我的全局 git 配置文件（`C:\Users\lvyi\.gitconfig`）中添加了一项：

```
[core]
    ignorecase = false
```

这时，`git status` 就能发现我的 git 仓库中 `Docs` 文件夹下的所有文件已经标记为修改了，都变成了 `docs`，于是愉快的提交推送：

```
$ git add .
$ git commit -m "Docs 文件夹改名为 docs 文件夹"
$ git push
```

然而去其他系统上看——居然有 `Docs` 和 `docs` 两份文件夹！！！而且比之前更严重，这一次可是里面的文件都完全重复了一份啊！！！

这时注意到 `git add .` 时，其实文件都是“新增”的，并不是“重命名”：

![img](window%E5%A4%A7%E5%B0%8F%E5%86%99%E4%B8%8D%E6%95%8F%E6%84%9F%E9%97%AE%E9%A2%98-imgs/2017-11-23-16-32-35.png)

看来需要使用第一种方法了。

### 尝试方法一：mv

我写下命令：

```
$ git mv -f ./Docs ./docs
```

执行……推送后最终效果居然和第一种方法一样！依然是有 `Docs` 和 `docs` 两份文件夹。

## 尝试出的可行的方法



这是堆栈网那位只有 70+ 赞的方法的改进版本。先将文件夹重命名为临时文件夹，然后再从临时文件夹恢复成正常文件夹。

但是（划重点）**中间需要先 commit 一次，否则和前面的方法效果一样，会存在两份文件夹！**

```
$ git mv ./Docs ./docs.bak
$ git add .
$ git commit -m "改名（第 1/2 步）"

$ git mv ./docs.bak/ ./docs
$ git add .
$ git commit -m "改名（第 2/2 步）"

$ git push
```

中间的 `git add .` 其实是可以不需要的，因为 `mv` 命令会自动将修改加入暂存区。

至此，文件夹才真的做了仅大小写的改名。

## 使用 Windows 10 四月更新的特性（推荐）



我在 [Windows 10 四月更新，文件夹名称也能区分大小写？](https://blog.walterlv.com/post/case-sensitive-in-windows-file-system) 一文中提到可以使用 `fsutil.exe file SetCaseSensitiveInfo` 使某个特定的文件夹支持区分大小写。

经过尝试，使用此方法后，git 能够支持一次提交完美解决仅大小写的文件夹改名问题，完全不用管 git 的某种配置或其他任何因素。

首先，使用管理员权限在当前文件夹启动 PowerShell：

![img](window%E5%A4%A7%E5%B0%8F%E5%86%99%E4%B8%8D%E6%95%8F%E6%84%9F%E9%97%AE%E9%A2%98-imgs/2018-06-20-10-43-02.png)

然后允许一下命令，以便开启此文件夹的大小写敏感功能。

```
> fsutil.exe file SetCaseSensitiveInfo . enable
```

随后，你可以像一般重命名一样去修改文件夹名称，然后像普通提交一样去 git commit。直接能生成一个仅修改文件夹名称大小写的新提交。

如果你在执行以上命令时出现了问题，请移步至 [Windows 10 四月更新，文件夹名称也能区分大小写？](https://blog.walterlv.com/post/case-sensitive-in-windows-file-system) 统一寻找解决方法。

------

**参考资料**

- [How do I commit case-sensitive only filename changes in Git? - Stack Overflow](https://stackoverflow.com/questions/17683458/how-do-i-commit-case-sensitive-only-filename-changes-in-git)
- [In a Git repository, how to properly rename a directory? - Stack Overflow](https://stackoverflow.com/q/11183788/6233938)

本文会经常更新，请阅读原文： https://blog.walterlv.com/post/case-insensitive-in-git-rename.html ，以避免陈旧错误知识的误导，同时有更好的阅读体验。

如果你想持续阅读我的最新博客，请点击 [RSS 订阅](https://blog.walterlv.com/feed.xml)，或者[前往 CSDN 关注我的主页](https://walterlv.blog.csdn.net/)。