常用命令：

npm init -y [--yes]

npm outdated 查看依赖库的最新版本

npm 能做什么？
1. 发布代码
2. 安装第三方代码
3. npx 运行代码
4. 下载独立的工具
5. 使用组织管理库的维护, 编码，开发者

npm consists of three distinct components:

- the website
- the Command Line Interface (CLI)
- the registry

## npm 库以及模块
### [public npm registry(公共npm注册表)](https://docs.npmjs.com/about-the-public-npm-registry)
The public npm registry is a database of JavaScript packages, each comprised of software and metadata. Open source developers and developers at companies use the npm registry to contribute packages to the entire community or members of their Orgs, and download packages to use in their own projects.

公共npm注册表是JavaScript包的数据库，每个包由软件和元数据组成。开源开发人员和公司的开发人员使用npm注册表向整个社区或其组织的成员提供包，并下载包供其自己的项目使用。

### [packages and modules](https://docs.npmjs.com/about-packages-and-modules)
#### package
A package is a file or directory that is described by a package.json file. A package must contain a package.json file in order to be published to the npm registry. 
包是由package.json描述的文件或目录。一个包必须包含一个package.json文件，以便发布到npm注册表。

A package is any of the following:

- a) A folder containing a program described by a `package.json` file.
- b) A gzipped tarball containing (a).
- c) A URL that resolves to (b).
- d) A `@` that is published on the registry with (c).
- e) A `@` that points to (d).
- f) A `` that has a `latest` tag satisfying (e).
- g) A `git` url that, when cloned, results in (a).

##### npm package git URL formats

Git URLs used for npm packages can be formatted in the following ways:

- `git://github.com/user/project.git#commit-ish`
- `git+ssh://user@hostname:project.git#commit-ish`
- `git+http://user@hostname/project/blah.git#commit-ish`
- `git+https://user@hostname/project/blah.git#commit-ish`

#### module

A **module** is any file or directory in the `node_modules` directory that can be loaded by the Node.js `require()` function.

To be loaded by the Node.js `require()` function, a module must be one of the following:

- A folder with a `package.json` file containing a `"main"` field.
- A folder with an `index.js` file in it.
- A JavaScript file.


## [npm 原理、特性、技巧，最佳实践](https://juejin.im/post/5ab3f77df265da2392364341#heading-0)

### 自定义npm init 行为

使用了prompt，


```js
const desc = prompt('description?', 'A new package...')
const bar = prompt('bar?', '')
const count = prompt('count?', '42')

let fs = require('fs');
let formatJson = require('format-json-pretty'); // 如果需要格式化输出

const data = { // 赋值给变量或者直接导出
  key: 'value',
  foo: {
    bar: bar,
    count: count
  },
  name: prompt('name?', process.cwd().split('/').pop()),
  version: prompt('version?', '0.1.0'),
  description: desc,
  main: 'index.js',
}

let baseDir = __dirname + '/../';
let opts = {
  cwd: baseDir,
  encoding: 'utf8',
  stdio: [process.stdin, process.stdout, process.stderr]
}
let fileName = baseDir + 'test.js';

fs.writeFileSync(fileName, `'use strict';\n\n module.exports = ${formatJson(data)}`, opts);

```

### 依赖包安装

#### 安装本地包

#### 安装私有git的package

#### **开源 package 问题修复**



### 4.1 semver

npm 依赖管理的一个重要特性是采用了[语义化版本 (semver)](https://semver.org/lang/zh-CN/) 规范，作为依赖**版本**管理方案。

semver 约定一个包的版本号必须包含3个数字，格式必须为 `MAJOR.MINOR.PATCH`, 意为 `主版本号.小版本号.修订版本号`.

- MAJOR 对应大的版本号迭代，做了不兼容旧版的修改时要更新 MAJOR 版本号
- MINOR 对应小版本迭代，发生兼容旧版API的修改或功能更新时，更新MINOR版本号
- PATCH 对应修订版本号，一般针对修复 BUG 的版本号

对于包作者（发布者），npm 要求在 publish 之前，必须更新版本号。npm 提供了 `npm version` 工具，执行 `npm version major|minor|patch` 可以简单地将版本号中相应的数字加1.

> 如果包是一个 git 仓库，`npm version` 还会自动创建一条注释为更新后版本号的 git commit 和名为该版本号的 tag

对于包的引用者来说，我们需要在 dependencies 中使用 semver 约定的 semver range 指定所需依赖包的版本号或版本范围。npm 提供了网站 https://semver.npmjs.com 可方便地计算所输入的表达式的匹配范围。常用的规则示例如下表：

| range           | 含义                                      | 例                                              |
| --------------- | ----------------------------------------- | ----------------------------------------------- |
| `^2.2.1`        | 指定的 MAJOR 版本号下, 所有更新的版本     | 匹配 `2.2.3`, `2.3.0`; 不匹配 `1.0.3`, `3.0.1`  |
| `~2.2.1`        | 指定 MAJOR.MINOR 版本号下，所有更新的版本 | 匹配 `2.2.3`, `2.2.9` ; 不匹配 `2.3.0`, `2.4.5` |
| `>=2.1`         | 版本号大于或等于 `2.1.0`                  | 匹配 `2.1.2`, `3.1`                             |
| `<=2.2`         | 版本号小于或等于 `2.2`                    | 匹配 `1.0.0`, `2.2.1`, `2.2.11`                 |
| `1.0.0 - 2.0.0` | 版本号从 1.0.0 (含) 到 2.0.0 (含)         | 匹配 `1.0.0`, `1.3.4`, `2.0.0`                  |

任意两条规则，用空格连接起来，表示“与”逻辑，即两条规则的交集:

如 `>=2.3.1 <=2.8.0` 可以解读为: `>=2.3.1` 且 `<=2.8.0`

- 可以匹配 `2.3.1`, `2.4.5`, `2.8.0`
- 但不匹配 `1.0.0`, `2.3.0`, `2.8.1`, `3.0.0`

任意两条规则，通过 `||` 连接起来，表示“或”逻辑，即两条规则的并集:

如 `^2 >=2.3.1 || ^3 >3.2`

- 可以匹配  `2.3.1`, `2,8.1`, `3.3.1`
- 但不匹配 `1.0.0`, `2.2.0`, `3.1.0`, `4.0.0`

PS: 除了这几种，还有如下更直观的表示版本号范围的写法:

- `*` 或 `x` 匹配所有主版本
- `1` 或 `1.x` 匹配 主版本号为 1 的所有版本
- `1.2` 或 `1.2.x` 匹配 版本号为 1.2 开头的所有版本

PPS: 在常规仅包含数字的版本号之外，semver 还允许在 `MAJOR.MINOR.PATCH` 后追加 `-` 后跟点号分隔的标签，作为预发布版本标签 - [Prerelese Tags](https://github.com/npm/node-semver#prerelease-tags)，通常被视为不稳定、不建议生产使用的版本。例如：

- `1.0.0-alpha`
- `1.0.0-beta.1`
- `1.0.0-rc.3`

上表中我们最常见的是 `^1.8.11` 这种格式的 range, 因为我们在使用 `npm install ` 安装包时，npm 默认安装当前最新版本，例如 `1.8.11`, 然后在所安装的版本号前加`^`号, 将 `^1.8.11` 写入 package.json 依赖配置，意味着可以匹配 1.8.11 以上，2.0.0 以下的所有版本。



#### npm install 和 npm update 的行为表现

> 下表为表述简单，省略了包名 webpack, install 简写 i, update 简写为 up

| #    | package.json (BEFORE) | node_modules (BEFORE) | package-lock (BEFORE) | command  | package.json (AFTER) | node_modules (AFTER) |
| ---- | --------------------- | --------------------- | --------------------- | -------- | -------------------- | -------------------- |
| a)   | `^1.8.0`              | @1.8.0                | @1.8.0                | `i`      | `^1.8.0`             | @1.8.0               |
| b)   | `^1.8.0`              | 空                    | @1.8.0                | `i`      | `^1.8.0`             | @1.8.0               |
| c)   | `^1.8.0`              | @1.8.0                | @1.8.0                | **`up`** | **`^1.15.0`**        | **@1.15.0**          |
| d)   | `^1.8.0`              | 空                    | @1.8.0                | `up`     | `^1.8.0`             | @1.15.0              |
| e)   | `^1.15.0`             | @1.8.0 (旧)           | @1.15.0               | **`i`**  | **`^1.15.0`**        | **@1.15.0**          |
| f)   | `^1.15.0`             | @1.8.0 (旧)           | @1.15.0               | **`up`** | **`^1.15.0`**        | **@1.15.0**          |

与 npm 3 相比，在安装和更新依赖版本上主要的区别为：

- 无论何时执行 install, npm 都会优先按照 package-lock 中指定的版本来安装 webpack; 避免了 npm 3 表中情形 b) 的状况;
- 无论何时完成安装/更新, package-lock 文件总会跟着 node_modules 更新 —— (因此可以视 package-lock 文件为 node_modules 的 JSON 表述)
- 已安装 node_modules 后若执行 npm update，package.json 中的版本号也会随之更改为 `^1.15.0`

由此可见 npm 5.1 使得 package.json 和 package-lock.json 中所保存的版本号更加统一，解决了 npm 之前的各种问题。只要遵循好的实践习惯，团队成员可以很方便地维护一套应用代码和 node_modules 依赖都一致的环境。

### 4.3 最佳实践

总结起来，在 2018 年 (node 9.8.0, npm 5.7.1) 时代，我认为的依赖版本管理应当是:

- 使用 npm: `>=5.1` 版本, 保持 `package-lock.json` 文件默认开启配置
- 初始化：第一作者初始化项目时使用 `npm install ` 安装依赖包, 默认保存 `^X.Y.Z` 依赖 range 到 package.json中; 提交 `package.json`, `package-lock.json`, **不要提交** `node_modules` 目录
- 初始化：项目成员**首次** checkout/clone 项目代码后，执行**一次** `npm install` 安装依赖包
- **不要**手动修改 package-lock.json
- 升级依赖包:
  - 升级小版本: 本地执行 `npm update` 升级到新的小版本
  - 升级大版本: 本地执行 `npm install @` 升级到新的大版本
  - 也可手动修改 package.json 中版本号为要**升级**的版本(大于现有版本号)并指定所需的 semver, 然后执行 `npm install`
  - 本地验证升级后新版本无问题后，**提交**新的 `package.json`, `package-lock.json` 文件
- 降级依赖包:
  - **正确**: `npm install @` 验证无问题后，**提交** package.json 和 package-lock.json 文件
  - **错误**: 手动修改 `package.json` 中的版本号为更低版本的 semver, 这样修改并不会生效，因为再次执行 `npm install` 依然会安装 `package-lock.json` 中的锁定版本
- 删除依赖包:
  - Plan A: `npm uninstall ` 并提交 `package.json` 和 `package-lock.json`
  - Plan B: 把要卸载的包从 package.json 中 dependencies 字段删除, 然后执行 `npm install` 并提交 `package.json` 和 `package-lock.json`
- 任何时候有人提交了 package.json, package-lock.json 更新后，团队其他成员应在 svn update/git pull 拉取更新后执行 `npm install` 脚本安装更新后的依赖包

## 5. npm scripts

### 5.1 基本使用

npm scripts 是 npm 另一个很重要的特性。通过在 package.json 中 scripts 字段定义一个脚本，例如：

```
{
    "scripts": {
        "echo": "echo HELLO WORLD"
    }
}
复制代码
```

我们就可以通过 `npm run echo` 命令来执行这段脚本，像在 shell 中执行该命令 `echo HELLO WORLD` 一样，看到终端输出 `HELLO WORLD`.

—— npm scripts 的基本使用就是这么简单，它提供了一个简单的接口用来调用工程相关的脚本。关于更详细的相关信息，可以参考阮一峰老师的文章 [npm script 使用指南 (2016年10月)](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html).

简要总结阮老师文章内容：

1. `npm run` 命令执行时，会把 `./node_modules/.bin/` 目录添加到执行环境的 `PATH` 变量中，因此如果某个**命令行包**未全局安装，而只安装在了当前项目的 node_modules 中，通过 `npm run` 一样可以调用该命令。

2. 执行 npm 脚本时要传入参数，需要在命令后加 `--` 标明, 如 `npm run test -- --grep="pattern"` 可以将 `--grep="pattern"` 参数传给 `test` 命令

3. npm 提供了 pre 和 post 两种钩子机制，可以定义某个脚本前后的执行脚本

4. 运行时变量：在 

   ```
   npm run
   ```

    的脚本执行环境内，可以通过环境变量的方式获取许多运行时相关信息，以下都可以通过 

   ```
   process.env
   ```

    对象访问获得：

   - `npm_lifecycle_event` - 正在运行的脚本名称
   - `npm_package_` - 获取当前包 package.json 中某个字段的配置值：如 `npm_package_name` 获取包名
   - `npm_package__` - package.json 中嵌套字段属性：如 `npm_pacakge_dependencies_webpack` 可以获取到 package.json 中的 `dependencies.webpack` 字段的值，即 webpack 的版本号

### 5.2 node_modules/.bin 目录

上面所说的 `node_modules/.bin` 目录，保存了依赖目录中所安装的可供调用的命令行包。

何谓命令行包？例如 `webpack` 就属于一个命令行包。如果我们在安装 webpack 时添加 `--global` 参数，就可以在终端直接输入 `webpack` 进行调用。但如果不加 `--global` 参数，我们会在 `node_modules/.bin` 目录里看到名为 webpack 的文件，如果在终端直接输入 `./node_modules/.bin/webpack` 命令，一样可以执行。

这是因为 `webpack` 在 `package.json` 文件中定义了 `bin` 字段为:

```
{
    "bin": {
        "webpack": "./bin/webpack.js"
    }
}
复制代码
```

bin 字段的配置格式为: `: `, 即 `命令名: 可执行文件`. npm 执行 install 时，会分析每个依赖包的 package.json 中的 `bin` 字段，并将其包含的条目安装到 `./node_modules/.bin` 目录中，文件名为 ``。而如果是全局模式安装，则会在 npm 全局安装路径的 bin 目录下创建指向 `` 名为 `` 的软链。因此，`./node_modules/.bin/webpack` 文件在通过命令行调用时，实际上就是在执行 `node ./node_modules/.bin/webpack.js` 命令。

正如上一节所说，`npm run` 命令在执行时会把 `./node_modules/.bin` 加入到 `PATH` 中，使我们可直接调用所有提供了命令行调用接口的依赖包。所以这里就引出了一个最佳实践：

> 将项目依赖的命令行工具安装到项目依赖文件夹中，然后通过 npm scripts 调用；而非全局安装

举例而言 `webpack` 作为前端工程标配的构建工具，虽然我们都习惯了全局安装并直接使用命令行调用，但不同的项目依赖的 webpack 版本可能不同，相应的 `webpack.config.js` 配置文件也可能只兼容了特定版本的 webpack. 如果我们仅全局安装了最新的 webpack 4.x 并使用 webpack 命令调用，在一个依赖 webpack 3.x 的工程中就会无法成功执行构建。

但如果这类工具总是本地安装，我们要调用一个命令，要手动添加 `./node_modules/.bin` 这个长长的前缀，未免也太麻烦了，我们 nodejs 开发者都很懒的。于是 npm 从5.2 开始自带了一个新的工具 `npx`.

### 5.3 npx

npx 的使用很简单，就是执行 `npx ` 即可，这里的 `` 默认就是 `./node_modules` 目录中安装的可执行脚本名。例如上面本地安装好的 webpack 包，我们可以直接使用 `npx webpack` 执行即可。

除了这种最简单的场景, npm cli 团队开发者 Kat Marchán 还在这篇文章中介绍了其他几种 npx 的神奇用法:  [Introducing npx: an npm package runner](https://bit.ly/2uzuIHv), 国内有位开发者 robin.law 将原文翻译为中文 [npx是什么，为什么需要npx?](https://robin-front.github.io/2017/07/14/introducing-npx-an-npm-package-runner/).

有兴趣的可以戳链接了解，懒得点链接的，看总结：

#### 场景a) 一键执行远程 npm 源的二进制包

除了在 package 中执行 ./node_modules/.bin 中已安装的命令, 还可以直接指定未安装的二进制包名执行。例如我们在一个没有 package.json 也没有 node_modules 的目录下，执行:

```
npx cowsay hello
复制代码
```

npx 将会从 npm 源下载 `cowsay` 这个包（但并不安装）并执行：

```
 _______ 
< hello >
 ------- 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

```

这种用途非常适合 1. 在本地简单测试或调试 npm 源上这些二进制包的功能；2. 调用 create-react-app 或 yeoman 这类往往每个项目只需要使用一次的脚手架工具

#### 场景b) 一键执行 GitHub Gist

还记得前面提到的 [2.1 package定义] 么，`npm install ` 可以是包含了有效 package.json 的 git url.

刚好 GitHub Gist 也是 git 仓库 的一种，集合 npx 就可以方便地将简单的脚本共享给其他人，拥有该链接的人无需将脚本安装到本地工作目录即可执行。将 package.json 和 需执行的二进制脚本上传至 gist, 在运行 `npx ` 就可以方便地执行该 gist 定义的命令。

原文作者 Kat Marchán 提供了[这个](https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32)示例 gist, 执行：

```
npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
```

可得到一个来自 GitHubGist 的 hello world 问候。

#### 场景c) 使用不同版本 node 执行命令

将 npx 与 Aria Stewart 创建的 `node` 包 (https://www.npmjs.com/package/node) 结合，可以实现在一行命令中使用指定版本的 node 执行命令。

例如先后执行：

```
npx node@4 -e "console.log(process.version)"
npx node@6 -e "console.log(process.version)"
复制代码
```

将分别输出 `v4.8.7` 和 `v6.13.0`.

往常这种工作是由 `nvm` 这类 node 版本管理工具来做的，但 `npx node@4` 这种方式免去 nvm 手动切换配置的步骤，更加简洁简单。



## 6. npm 配置

### 6.1 npm config

npm cli 提供了 `npm config` 命令进行 npm 相关配置，通过 `npm config ls -l` 可查看 npm 的所有配置，包括默认配置。npm 文档页为每个配置项提供了详细的说明 https://docs.npmjs.com/misc/config .

修改配置的命令为 `npm config set  `, 我们使用相关的常见重要配置:

- `proxy`, `https-proxy`: 指定 npm 使用的代理
- `registry` 指定 npm 下载安装包时的源，默认为 `https://registry.npmjs.org/` 可以指定为私有 Registry 源
- `package-lock` 指定是否默认生成 package-lock 文件，建议保持默认 true
- `save` true/false 指定是否在 npm install 后保存包为 dependencies, npm 5 起默认为 true

删除指定的配置项命令为 `npm config delete `.

### 6.2 npmrc 文件

除了使用 CLI 的 `npm config` 命令显示更改 npm 配置，还可以通过 npmrc 文件直接修改配置。

这样的 npmrc 文件优先级由高到低包括：

- 工程内配置文件: `/path/to/my/project/.npmrc`
- 用户级配置文件: `~/.npmrc`
- 全局配置文件: `$PREFIX/etc/npmrc` (即`npm config get globalconfig` 输出的路径)
- npm内置配置文件: `/path/to/npm/npmrc`

通过这个机制，我们可以方便地在工程跟目录创建一个 `.npmrc` 文件来共享需要在团队间共享的 npm 运行相关配置。比如如果我们在公司内网环境下需通过代理才可访问 registry.npmjs.org 源，或需访问内网的 registry, 就可以在工作项目下新增 .npmrc 文件并提交代码库。

```
proxy = http://proxy.example.com/
https-proxy = http://proxy.example.com/
registry = http://registry.example.com/
复制代码
```

因为项目级 .npmrc 文件的作用域只在本项目下，所以在非本目录下，这些配置并不生效。对于使用笔记本工作的开发者，可以很好地隔离公司的工作项目、在家学习研究项目两种不同的环境。

将这个功能与 `~/.npm-init.js` 配置相结合，可以将特定配置的 .npmrc 跟 .gitignore, README 之类文件一起做到 npm init 脚手架中，进一步减少手动配置。

### 6.3 node 版本约束

虽然一个项目的团队都共享了相同的代码，但每个人的开发机器可能安装了不同的 node 版本，此外服务器端的也可能与本地开发机不一致。

这又是一个可能带来不一致性的因素 —— 但也不是很难解决，声明式约束+脚本限制即可。

**声明**：通过 `package.json` 的 `engines` 属性声明应用运行所需的版本运行时要求。例如我们的项目中使用了 `async`, `await` 特性，[查阅兼容性表格](https://node.green)得知最低支持版本为 7.6.0，因此指定 engines 配置为:

```
{
    "engines": { "node": ">=7.6.0"}
}
复制代码
```

**强约束**(可选)：在 npm 中以上字段内容仅作为建议字段使用，若要在私有项目中添加强约束，需要自己写脚本钩子，读取并解析 engines 字段的 semver range 并与运行时环境做对比校验并适当提醒。


作者：rianma
链接：https://juejin.im/post/5ab3f77df265da2392364341
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


## 查找全局安装的库

npm list -g --depth 0