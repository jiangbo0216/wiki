## trim whitespace

i like my editor to trim whitespace.
the only problem i have is with markdown files, where whitespace at the end is used for a newline.
to workaround the problem i added this in vscode settings.json

    "files.trimTrailingWhitespace": true,
    "[markdown]": {
        "files.trimTrailingWhitespace": false
    }

参考链接: <https://github.com/editorconfig/editorconfig-vscode/issues/153>

## wsl watch

```
"files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true
  }
```

## live-sass

  "liveSassCompile.settings":{
    "formats":[
        {
            "format": "compressed",
            "extensionName": ".css",
        },
    ],
    "includeItems":[
      "xx.scss"
    ],
    "autoprefix": [
      "> 1%",
      "last 2 versions"
    ]
  }

## vscode禁用eslint检查node_modules

  "eslint.options": {
    "ignorePattern": ["*/node_modules/*"," */build/*","*/dist/*"]
  },

  支持的参数参考：
  https://eslint.org/docs/developer-guide/nodejs-api#cliengine

## vue 文件自动提示 行内 css

编辑`file.association`，在`setting.json`中
`"files.associations": {"*vue": "html"}`
