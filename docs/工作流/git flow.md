### Git-flow工作流

>ps. 所有`start`、`finish`之前，都要先把develop和master分支origin pull。

1. 初始化：

    ```git
    git flow init -fd   # （整个项目首次声明一次即可）
    ```
 保证各分支的前缀
 ```text
 Feature  feature/
 Bugfix  bugfix/
 Release  release/
 Hotfix  hotfix/
 Support  support/
 ```

2. 开发新需求：

    ```git
    git flow feature start “需求名” [“develop的SHA”]
        # -> 基于“develop的SHA”或最新develop，在本地创建并切换至“feature/需求名”分支

    提交具体需求的commits到本地或推送远程“feature/需求名”
    ```


    # !!!在这一步提测、修改bug。必须满足“QA测试通过、同事review通过、依赖的接口上线完成、后台依赖数据配置完成”之后才可以继续进行下面操作
    
    # 本地必须先pull feature/需求名、develop分支，解决冲突、merge，否则无法执行命令
    git flow feature finish “需求名”
        # -> “feature/需求名”合并（--no-ff）至本地develop分支
        # -> 删除本地“feature/需求名”分支，切换至develop分支
        # -> 可能删除远程的“feature/需求名”分支
    
    git checkout develop
    git push origin develop
        # -> 推送至远程develop分支
    ```
    
    >可以分别开发多个需求，再一起发布（release），把已经存在的release分支合并develop分支。
3. 发布版本：

    ```git
    git flow release start “版本号” [“develop的SHA”] （提升第二个版本号）
        # -> 基于“develop的SHA”或最新develop，在本地创建并切换至“release/版本号”分支

    提交需要改动的commits到本地或推送远程“release/版本号”
        # 修复临时发现的问题（可选）
        # 确定改动完成改动后：
            # 1. 更新package.json版本号
            # 2. 更新changelog（手写或`npm run changelog`命令生成）

    # 本地必须先pull release/版本号、develop分支、master分支，解决冲突、merge，否则无法执行命令
    git tag <测试tag> #alpha 环境验证
    ```


    # !!!QA测试通过后，提交Merge request（release 合并至 master），让有权限的同学合并成功之后，才能继续往下走
    
    git flow release finish “版本号”
        # tag描述（手写或复制changelog）
        # -> “release/版本号”合并（--no-ff）至本地develop分支、本地master分支
        # -> 新建本地“版本号”tag
        # -> 删除本地“release/版本号”分支，切换至develop分支
        # -> 可能删除远程的“release/版本号”分支

 

    git checkout develop
    git push origin develop
        # -> 推送至远程develop分支
    
    git checkout master
    git push origin master
        # -> 推送至远程master分支
    
    git push origin “版本号”
        # -> 推送至远程tag


    最好用此时的tag发布预发布验证通过后再上线
    ```
    
    >若要把已经完成的feature内容添加到已存在的release分支，仅需release分支合并develop分支（`git checkout “release/版本号”; git merge develop`），而不需要release start
4. 线上bug修复：

    >类似于release。

    ```git
    git flow hotfix start “版本号” [“master的SHA”]
        # -> 基于“master的SHA”或最新master，在本地创建并切换至“hotfix/版本号”分支

    提交具体需求的commits到本地或推送远程“hotfix/版本号”
        # 确定改动完成改动后：
            # 1. 更新package.json版本号
            # 2. 更新changelog（手写或命令生成）
    ```
 # !!!在这一步提测、修改bug。只有测试通过且同事review之后才可以继续进行下面操作
    # 本地必须先pull hotfix/版本号、develop分支、master分支，解决冲突、merge，否则无法执行命令
    
    # !!!QA测试通过后，提交Merge request（hotfix 合并至 master），让有权限的同学合并成功之后，才能继续往下走
    
    git flow hotfix finish “版本号”
        # tag描述（手写或复制changelog）
        # -> “hotfix/版本号”合并（--no-ff）至本地master分支、本地develop分支
        # -> 新建本地“版本号”tag
        # -> 删除本地“release/版本号”分支，切换至develop分支
        # -> 可能删除远程的“release/版本号”分支
    
    git checkout develop
    git push origin develop
        # -> 推送至远程develop分支
    
    git checkout master
    git push origin master
        # -> 推送至远程master分支
    
    git push origin “版本号”
        # -> 推送至远程tag


    最好用此时的tag发布预发布验证通过后再上线
    ```

### 统一约定

1. VERSION 和 RELEASE 统一约定为语义化版本号 x.y.z 的形式（参考：[semver](https://semver.org/lang/zh-CN/)）

> 遵循语义化版本号
>
> 如果一个项目开始和他人共享，它应该从1.0.0开始。
>
> 接下来，每次改动应该遵循下面的原则：
>
> 1. 修复bug或者其他小的改动：属于补丁版本，增加最后一个数字，比如 1.0.1
>
> 2. 新增新的特性，但是不会打破现有的特性：属于小版本，增加中间的一位数字，比如 1.1.0
>
> 3. 产生不能向后兼容的变化：属于大版本，增加第一位数字，比如 2.0.0

2. hofix和feature区分
    1. 如果是为了快速上线解决线上的bug，可以作为hotfix来处理
    2. 其他增加新功能或者修改一些复杂bug（测试上线时间未知），均作为feature来处理
3. feature开发完成后，必须满足“QA测试通过、同事review通过、依赖的接口上线完成、后台依赖数据配置完成”之后才可以finish。
4. 可以一次release发布多个feature。

### 参考阅读

- git-flow 备忘清单 <http://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html>
- Using git-flow to automate your git branching workflow <http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/>
