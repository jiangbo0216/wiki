## 开始
### 开发环境
* nodejs
* git
* Yeoman and VS Code Extension Generator `npm install -g yo generator-code`

开发流程：
1. yo code
2. code ./<your.project.name>
3. F5

### 扩展解析
* Registers the onCommand Activation Event: onCommand:extension.helloWorld, so the extension becomes activated when user runs the Hello World command. (命令触发)
* Uses the contributes.commands Contribution Point to make the command Hello World available in the Command Palette, and bind it to a command ID extension.helloWorld. (触发的入口，相当于发送指令)
* Uses the commands.registerCommand VS Code API to bind a function to the registered command ID extension.helloWorld. (绑定函数)

Understanding these three concepts is crucial to writing extensions in VS Code:

* Activation Events: events upon which your extension becomes active.
* Contribution Points: static declarations that you make in the package.json Extension Manifest to extend VS Code.
* VS Code API: a set of JavaScript API that you can invoke in your extension code.


#### extension 文件结构
```
.
├── .vscode
│   ├── launch.json     // Config for launching and debugging the extension
│   └── tasks.json      // Config for build task that compiles TypeScript
├── .gitignore          // Ignore build output and node_modules
├── README.md           // Readable description of your extension's functionality
├── src
│   └── extension.ts    // Extension source code
├── package.json        // Extension manifest
├── tsconfig.json       // TypeScript configuration

```
You can read more about the configuration files:

* launch.json used to configure VS Code Debugging
* tasks.json for defining VS Code Tasks
* tsconfig.json consult the TypeScript Handbook


### 禁止abc提示
"javascript.suggest.names": false

