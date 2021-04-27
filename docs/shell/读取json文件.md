## [读取json文件的值](https://stackoverflow.com/questions/43165840/get-value-of-package-json-in-gitlab-ci-yml)

```shell
export VERSION=$(node -p "require('./package.json').version")
```
