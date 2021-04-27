[Mobx](https://cn.mobx.js.org/)

MobX >=5 版本运行在任何支持 ES6 proxy 的浏览器。如果运行在像 IE11、Node.js 6 以下版本或依靠与较旧的 JavaScripCore 的安卓端的 React Native (点击查看如何升级])。

任何源自应用状态的东西都应该自动地获得。

* @action
* @observable
* @computed
* observer
* @action

React 和 MobX 是一对强力组合。React 通过提供机制把应用状态转换为可渲染组件树并对其进行渲染。而MobX提供机制来存储和更新应用状态供 React 使用。

## 开发环境
### [装饰器语法](https://cn.mobx.js.org/best/decorators.html#%E5%90%AF%E7%94%A8%E8%A3%85%E9%A5%B0%E5%99%A8%E8%AF%AD%E6%B3%95)
如果想使用装饰器，需要按照下列步骤。

TypeScript

在 tsconfig.json 中启用编译器选项 `"experimentalDecorators": true` 。

Babel: 使用 `babel-preset-mobx`

另外一种在 Babel 中配置 MobX 的方式是使用 mobx preset，这种方式更方便，其中包含了装饰器及其他几个经常与 mobx 一起使用的插件:

`npm install --save-dev babel-preset-mobx`

.babelrc:
```
{
  "presets": ["mobx"]
}
```
Babel: 手动启用装饰器

要启用装饰器的支持而不使用 mobx preset 的话，需要按照下列步骤。 安装支持装饰器所需依赖: npm i --save-dev babel-plugin-transform-decorators-legacy 。 并在 .babelrc 文件中启用:
```
{
    "presets": ["es2015", "stage-1"],
  "plugins": ["transform-decorators-legacy"]
}
```
注意，插件的顺序很重要: transform-decorators-legacy 应该放在首位。


## Observable state(可观察的状态)
装饰器 decorator 语法与 decorate
```js
import { observable } from "mobx";

class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}
```
等价于
```js
import { decorate, observable } from "mobx";

class Todo {
    id = Math.random();
    title = "";
    finished = false;
}
decorate(Todo, {
    title: observable,
    finished: observable
})
```

## Computed values(计算值)
使用 MobX， 你可以定义在相关数据发生变化时自动更新的值。 通过@computed 装饰器或者利用 (extend)Observable 时调用 的getter / setter 函数来进行使用。(当然，这里也可以再次使用 decorate 来替代 @ 语法)。
```js
class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}
```

## Reactions(反应)
Reactions 和计算值很像，但它不是产生一个新的值，而是会产生一些副作用，比如打印到控制台、网络请求、递增地更新 React 组件树以修补DOM、等等。 简而言之，reactions 在 响应式编程和命令式编程之间建立沟通的桥梁。


## React 组件
如果你用 React 的话，可以把你的(无状态函数)组件变成响应式组件，方法是在组件上添加 observer 函数/ 装饰器. observer由 mobx-react 包提供的。

分为class写法和function写法
```js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

@observer
class TodoListView extends Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
)

const store = new TodoList();
ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('mount'));

```
observer 会将 React (函数)组件转换为它们需要渲染的数据的衍生


## 自定义 reactions
使用autorun、reaction 和 when 函数即可简单的创建自定义 reactions，以满足你的具体场景。

例如，每当 unfinishedTodoCount 的数量发生变化时，下面的 autorun 会打印日志消息:

autorun(() => {
    console.log("Tasks left: " + todos.unfinishedTodoCount)
})


## action
这些写法都是一致的，目的是为了绑定this
* action(fn)
* action(name, fn)
* @action classMethod() {}
* @action(name) classMethod () {}
* @action boundClassMethod = (args) => { body }
* @action(name) boundClassMethod = (args) => { body }
* @action.bound classMethod() {}  绑定this

它接收一个函数并返回具有同样签名的函数，但是用 transaction、untracked 和 allowStateChanges 包裹起来，尤其是 transaction 的自动应用会产生巨大的性能收益， 动作会分批处理变化并只在(最外层的)动作完成后通知计算值和反应。 这将确保在动作完成之前，在动作期间生成的中间值或未完成的值对应用的其余部分是不可见的。

结果才会改变观察值

### 何时使用动作？
应该永远只对修改状态的函数使用动作。 只执行查找，过滤器等函数不应该被标记为动作，以允许 MobX 跟踪它们的调用。

