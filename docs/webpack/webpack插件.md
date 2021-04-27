# Inline Source extension for the HTML Webpack Plugin

[![npm version](https://camo.githubusercontent.com/7c4d8fb58353c5aa6b9281023a174d35d17fbf71/68747470733a2f2f62616467652e667572792e696f2f6a732f68746d6c2d7765627061636b2d696e6c696e652d736f757263652d706c7567696e2e737667)](https://badge.fury.io/js/html-webpack-inline-source-plugin) [![Build status](https://camo.githubusercontent.com/656c72b73c1dee8fef777a3c6d9f0c047a898702/68747470733a2f2f7472617669732d63692e6f72672f44757374696e4a61636b736f6e2f68746d6c2d7765627061636b2d696e6c696e652d736f757263652d706c7567696e2e7376673f6272616e63683d6d6173746572)](https://travis-ci.org/DustinJackson/html-webpack-inline-source-plugin) [![js-semistandard-style](https://camo.githubusercontent.com/55bc97ef202631b6c3c164fafcd245a6153284e2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d73656d697374616e646172642d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)](https://github.com/Flet/semistandard)

Enhances [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) functionality by adding the `{inlineSource: 'regex string'}` option.

This is an extension plugin for the [webpack](http://webpack.github.io/) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) (version 4 or higher). It allows you to embed javascript and css source inline.

## Installation

You must be running webpack on node 6 or higher.

Install the plugin with npm:

```
$ npm install --save-dev html-webpack-inline-source-plugin
```

## Basic Usage

Require the plugin in your webpack config:

```
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
```

Add the plugin to your webpack config as follows:

```
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackInlineSourcePlugin()
]  
```

The above configuration will actually do nothing due to the configuration defaults.

When you set `inlineSource` to a regular expression the source code for any javascript or css file names that match will be embedded inline in the resulting html document.

修改inlineSource为特定的文件`(inline-source|common).+\\.js$`：表示内联inline-source或者common开头的js文件

```
plugins: [
  new HtmlWebpackPlugin({
		inlineSource: '.(js|css)$' // embed all javascript and css inline
	}),
  new HtmlWebpackInlineSourcePlugin()
]  
```

## Sourcemaps

If any source files contain a sourceMappingURL directive that isn't a data URI, then the sourcemap URL is corrected to be relative to the domain root (unless it already is) instead of to the original source file.

All sourcemap comment styles are supported:

- `//# ...`
- `//@ ...`
- `/*# ...*/`
- `/*@ ...*/`