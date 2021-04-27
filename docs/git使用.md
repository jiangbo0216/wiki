## 放弃本地修改, 强制拉取更新

```shell
git fetch --all
git reset --hard origin/master
git pull //可以省略
```

## remote

git remote -h

## 获取帮助

参考： <https://git-scm.com/book/en/v2/Getting-Started-Getting-Help>

```
$ git help <verb>
$ git <verb> --help
$ man git-<verb>
git add -h
```

## tag

### 删除tag

`git tag -d <tag-naem>`

## 修改已commit的版本

`git add <file-name | .>`
`git commit --amend --no-edit`
每个commit内容显示在一行
git log --oneline

## 之前是使用https clone下来的项目改成ssh 设置git源地址, 修改origin

修改 ./git 目录下的 config文件
cd .git && vim config
修改其中url 为 git@XXXX

使用命令行
git remote set-url origin git@github.com:AccountName/Project-name.git

## 添加与提交

git add < filename >
git add *

git commit -m "代码提交信息"

## 推送

在 .git/config 声明 remote，使用git-remote或者git-config或者手动修改，使用git push 的时候没有指定remote，如果省略将会默认使用配置文件中的remote
> [Named remote in configuration file
You can choose to provide the name of a remote which you had previously configured using git-remote[1], git-config[1] or even by a manual edit to the $GIT_DIR/config file. The URL of this remote will be used to access the repository. The refspec of this remote will be used by default when you do not provide a refspec on the command line. The entry in the config file would appear like this:](https://www.git-scm.com/docs/git-push#REMOTES)

 [remote "<name>"]
  url = <url>
  pushurl = <pushurl>
  push = <refspec>
  fetch = <refspec>

```
The <pushurl> is used for pushes only. It is optional and defaults to <url>.
```

git push origin master

git remote add origin < server >

这里 origin 是 < server > 的别名，取什么名字都可以，你也可以在 push 时将 < server > 替换为 origin。但为了以后 push 方便，我们第一次一般都会先 remote add。
如果你还没有 git 仓库，可以在 GitHub 等代码托管平台上创建一个空（不要自动生成 README.md）的 repository，然后将代码 push 到远端仓库。

## 新建一个空白分支

git checkout --orphan gh-pages

git rm -rf .

这个时候时无法查看到分支的

在commit 一次之后即可 使用 git branch -a 查看到分支

## git merge & rebase

```sh
$ git checkout feature
$ git merge master

# (or)

$ git merge master feature
```

### merge

Incorporates changes from the named commits (since the time their histories diverged from the current branch) into the current branch. This command is used by git pull to incorporate changes from another repository and can be used by hand to merge changes from one branch into another.
从给定的commit合并到当前的分支，合并的是给定commit的与当前分支分叉后两条历史记录产生的所有commits。这条命令在git pull 的时候也会被使用

## pull

Fetch from and integrate with another repository or a local branch
相当于 fetch & merge

Merge into the current branch the remote branch next:

$ git pull origin next
等同于
This leaves a copy of next temporarily in FETCH_HEAD, but does not update any remote-tracking branches. Using remote-tracking branches, the same can be done by invoking fetch and merge:

$ git fetch origin
$ git merge origin/next

## fetch

git-fetch - Download objects and refs from another repository

## git internals

### .git目录结构

```
$ ls -F1
COMMIT_EDITMSG
config
description
FETCH_HEAD
HEAD
hooks/
index
info/
logs/
objects/
ORIG_HEAD
packed-refs
refs/
```

一个初始化的 .git 目录

```
$ ls -F1
config
description
HEAD
hooks/
info/
objects/
refs/
```

## [submodule](https://juejin.im/post/5ca47a84e51d4565372e46e0)

git submodule add <https://github.com/chaconinc/someSubmodule>  src/submodulePath

## 干掉所有的commit

git update-ref -d HEAD

## [丢弃本地修改所有文件](https://blog.csdn.net/leedaning/article/details/51304690)

```
git checkout . #本地所有修改的。没有的提交的，都返回到原来的状态
git stash #把所有没有提交的修改暂存到stash里面。可用git stash pop回复。
git reset --hard HASH #返回到某个节点，不保留修改。
git reset --soft HASH #返回到某个节点。保留修改

git clean -df #返回到某个节点
git clean 参数
    -n 显示 将要 删除的 文件 和  目录
    -f 删除 文件
    -df 删除 文件 和 目录


也可以使用

git checkout . && git clean -xdf
```

## [The “fatal: refusing to merge unrelated histories” Git error](https://www.educative.io/edpresso/the-fatal-refusing-to-merge-unrelated-histories-git-error#:~:text=The%20%E2%80%9Cfatal%3A%20refusing%20to%20merge%20unrelated%20histories%E2%80%9D%20Git%20error,and%20have%20mismatching%20commit%20histories).)

出现原因: 本地.git文件和远程不同步

解决方法：
可以直接合并
git pull origin master --allow-unrelated-histories

重新拉取

```
git update-ref -d HEAD
git checkout .
git pull
```

# [Git error - Fatal: Refusing to merge unrelated histories](https://www.datree.io/resources/git-error-fatal-refusing-to-merge-unrelated-histories)

## The "fatal: refusing to merge unrelated histories" error

It is worth pointing out a little bit about how Git works and specifically and how it tracks each repository’s individual history. When a $git init command is executed to [create a new Git repository](https://git-scm.com/docs/git-init), Git will create a directory with the extension .git.

The .git directory is where, among other things, the changes or “commits” will be tracked - the history of the repo. Rewriting a repository history is possible, but it is a not a common use case, because Git’s whole reason for existing, [some might argue](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git), is to control the different versions of a file - put another way - track the file’s history. This is what is commonly referred to as “version control” and git is what enables it. When a user action (like git merge) can cause rewriting of the history data, Git throws errors in part to ensure the user fully understands what they are doing.

In short, the solution is to use the flag --allow-unrelated-histories. If the error occurred while using $git pull then this is an example:

$ git pull origin [repo]
fatal: refusing to merge unrelated histories

‍

Then the solution is this:

$ git pull origin [repo] --allow-unrelated-histories

‍

## Which Git commands are causing this error

‍

In the example, the error occurs during a git pull.

$ git pull origin [repo]
fatal: refusing to merge unrelated histories

It is worth remembering that a git pull is a combination of two other commands: git fetch and git merge. So, when asking Git to pull the repo, more specifically, the user is asking Git to do several tasks:

- Find and download commits from the repo on the remote (fetch)
- Compare the remote to the local (merge)
- Update the code based on the most recent changes (merge)
- Report back to the user (fetch or merge)

If the remote repository’s .git directory already has changes tracked (commits have been added) by another user through an unnoticed branch, Git will throw the error fatal: refusing to merge unrelated histories because it is noticing that difference between the local and remote .git directories with a git pull command.

## Which scenario can cause this error

When configuring a local repository to a different remote repository. This (wrong) configuration can mistakenly happen when creating a repository in remote and locally with the same name.

For example, when using GitHub’s interface (GUI) to [create a new repository](https://help.github.com/en/articles/create-a-repo) and initialize the repository with a file / adding a file later (via the GitHub’s GUI). If a user were to work with the command line locally, run $ git init and create a repository with the same name, now there are two different repositories (one local and one on remote), with the same name.

So, when trying to push commits to the remote (on GitHub), the user will encounter the **refusing to merge unrelated histories** error. Although the repositories have the same name, Git “sees” them as two different repositories because they have two different change trees, with no common ancestor to calculate the differences between them. It is recommended to use $ git clone to copy the new repository locally after creating it on GitHub to avoid any inconsistency.

‍

## Why use a flag

Using the flag --allow-unrelated-histories does seem like an easy enough solution, but it is worth reminding to use caution. You have to dig around on the internet to figure this out, It is a flag and not a default option - for a reason. If two repos did not have related histories and you did not actually intend to combine them, using this option unnecessarily could inadvertently add substantial complications to an existing repo. Allowing unrelated histories can cause more headaches than it is worth.

If you are uninitiated to working in large repos and the complexities of merging, or the many options that exist, feel the Twitter woes of “[merge hell](https://twitter.com/hashtag/mergehell?src=hash)”.

## When you should merge two unrelated histories

Maybe you are working on two different but related git repositories and then came to understand that working on two different git repositories will lead to duplication of work and may complicate automation process (e.g. CI/CD).

If you want to combine two separate (but related) project repositories that should be in one repository, but they have unrelated histories, it is a legit use case to use the --allow-unrelated-histories to “overcome” the “fatal: refusing to merge unrelated histories error message”.
