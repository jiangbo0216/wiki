## rsync 同步排除删除目标地址文件文件

rsync -av --delete --exclude "A"  --exclude "B" src dest

--delete 完全删除

## 同步排除源地址文件

按照文件排除
rsync -ravL --exclude-from '/home/backup/exclude.txt' . root@192.168.0.199:/data/
rsync -ravL --exclude="fileA1.txt" . root@192.168.0.199:/data/

文件格式:
sources
public_html/database.*
downloads/test/*

## 同步到远程机器

rsync -ravL . root@192.168.0.199:/data/
