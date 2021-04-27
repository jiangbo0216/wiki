## package.json 各字段的含义

* [types / typings](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#including-declarations-in-your-npm-package):  含义相同, 主声明文件 Set the types property to point to your bundled declaration file.
* files:
* main: 指定包的入口文件
* name: 指定包名
  * 发布之前都要去NPM 官网上搜索一遍，确认想要使用的包名，是否已经被占用。
  * 包名支持 [@scope]/[package name] 的形式，[@scope] 类似于命名空间的作用，NPM 默认允许你使用自己注册的用户名，或者在自己的账户下申请的 organizations。
  * 典型的例子，如 Babel，插件原先使用的是 babel-plugin-xxx 的格式命名，后来因为许多个人发布的包和官方的包命名格式一样，导致难以区分，现在 babel 官方所有的包都更换成了 @babel/xxx 的格式。
* files：指定哪些文件夹、文件将被发布
  * 如果你的项目目录下包含了一些隐私文件，不希望被发布出去，一定要注意配置此项，仅包含可以被发布的文件夹、文件。
  * 可以在包的根目录下新建文件 .npmignore，指定哪些文件不被发布，书写格式与 .gitignore 文件一致。
