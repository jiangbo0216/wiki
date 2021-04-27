https://my.oschina.net/someok/blog/2050469

# webpack 配置

在 js 中 import 相对路径代码的时候经常出现路径层级较深的情况，引入起来比较麻烦（虽然 webstorm 支持提示简化了不少），所以在 webpack 中可以做如下配置：

```
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            }
        },
```

于是 `import {getJson, del} from '../../../../model/apiUtils';` 就可以写成 `import {getJson, del} from '@/model/apiUtils';`

当然，使用 `resolve.modules` 也可以达到类似效果：

```
        resolve: {
            modules: [
                context,
                'node_modules',
            ]
        },
```

这样配置的话引入语句就变成了 `import {getJson, del} from 'model/apiUtils`。

不过这样的缺陷也很明显，如果自己的某个文件夹与 `node_modules` 下的组件同名的话会忽略后者，这样可能无法达到我们想要的效果，所以推荐使用 `alias` 模式。

# eslint 配置

不过上述配置之后，在 eslint 里面会提示：

> Unable to resolve path to module '@/component' import/no-unresolved

解决办法是使用 [eslint-import-resolver-alias](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2Fjohvin%2Feslint-import-resolver-alias)，在 eslint 配置中增加如下代码：

```
"settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ["@", "./src"]
        ],
        "extensions": [".js", ".jsx", ".json"]
      }
    }
  },
```

Over