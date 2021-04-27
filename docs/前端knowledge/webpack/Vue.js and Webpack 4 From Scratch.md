## Vue.js and Webpack 4 From Scratch

参考链接： https://itnext.io/vue-js-and-webpack-4-from-scratch-part-3-3f68d2a3c127

### build
```
npm init
npm i vue vue-router
npm i -D webpack webpack-cli

mkdir pages components router build
touch app.js App.vue index.html build/webpack.config.dev.js

npm i -D vue-loader vue-template-compiler vue-style-loader css-loader

```
#### app.js
```
import Vue from 'vue'
import App from './App.vue'
new Vue({
  el: '#app',
  render: h => h(App)
})
```

#### App.vue
```
<template>
  <div>
    <h1>Hello World!</h1>
  </div>
</template>
```


#### webpack
webpack.config.dev.js
```
'use strict'
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  mode: 'development',
  entry: [
    './src/app.js'
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

#### package.json
"build": "webpack --config build/webpack.config.dev.js"

index.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>My Vue app with webpack 4</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="dist/main.js" type="text/javascript"></script>
  </body>
</html>
```

### hotload
```
npm i -D webpack-dev-server html-webpack-plugin
npm i -D css-loader vue-style-loader
```


#### package.json
"build": "webpack --config build/webpack.config.dev.js"
"dev": "webpack-dev-server --config build/webpack.config.dev.js"


#### stylus
```
npm i -D stylus stylus-loader
```

#### babel
```
npm i -D @babel/core babel-loader @babel/preset-env

```
.babelrc
```

{
  "presets": [
    ["@babel/env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }]
  ]
}
```


vue-loader will split out your single-file components into separate modules for your html, js and styles, we want babel-loader to process the js part of this.

### webpack.config.dev.js
```
'use strict'

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: [
    './src/app.js'
  ],
  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}
```


### linting

```
npm i -D eslint eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-config-standard babel-eslint eslint-loader eslint-plugin-vue
```

.eslintrc.js
```
module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'vue'
  ]
}
```

package.json
```
"lint": "eslint --ext .js,.vue src"
```

#### webpack linting pre
```

npm install --save-dev eslint-loader
```
```

{
  test: /\.(js|vue)$/,
  use: 'eslint-loader',
  enforce: 'pre'
}
```

### static assets
```
npm install --save-dev copy-webpack-plugin
```
```
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
plugins: [
  new CopyWebpackPlugin([{
    from: resolve('static/img'),
    to: resolve('dist/static/img'),
    toType: 'dir'
  }])
]
```

### testing

```
npm install --save-dev jest babel-jest vue-jest jest-serializer-vue @vue/test-utils
```

```
"jest": {
  "moduleFileExtensions": [
    "js",
    "vue"
  ],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  "transform": {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
  "snapshotSerializers": [
    "<rootDir>/node_modules/jest-serializer-vue"
  ]
}
```

package.json
```
"test": "jest"
```

.babelrc
```
"env": {
  "test": {
    "presets": [
      ["env", { "targets": { "node": "current" }}]
    ]
  }
}
```

.eslintrc.js
```
env: {
  browser: true,
  node: true,
  mocha: true
},
globals: {
  expect: true
}
```

### Extracting CSS
```
npm install --save-dev mini-css-extract-plugin
```

```
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
.
.
plugins: [
  new MiniCssExtractPlugin({
    filename: 'main.css'
  })
]
```

```
module: {
  rules: [
    {
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.styl(us)?$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'stylus-loader'
      ]
    }
  ]
}
```