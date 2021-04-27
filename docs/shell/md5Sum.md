## 输出md5结果到文件

md5Sum ./file.ts > ./md5.txt

## 校验结果

md5sum -c ./md5.txt

## 校验结果用作条件判断

```sh
isModify=true
if md5sum -c ./md5.txt; then
    isModify=false
fi

```
